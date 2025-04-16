const { Reserva, Ventas, DetalleVenta } = require('../models'); 
const viajesController = require('../controllers/viajesController');

// Obtener reserva por usuario y viaje
exports.obtenerVentasPorViaje = async (req, res) => {
    try {
        const viajeCompleto = await viajesController.obtenerViajeId(req.params.id);
        if (!viajeCompleto) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        }

        // Eliminar 'id' y 'medioTransporte_id' del viaje
        const { id, medioTransporte_id, ...viaje } = viajeCompleto.toJSON();

        const reservas = await Reserva.findAll({
            where: {
                viajes_id: req.params.id
            },
            attributes: ['id', 'fechaReserva']
        });

        const reservasIds = reservas.map(r => r.id);

        if (reservasIds.length === 0) {
            return res.status(200).json({ viaje, reserva: [] });
        }

        const ventas = await Ventas.findAll({
            where: {
                reserva_id: reservasIds
            },
            attributes: ['id', 'fecha', 'hora', 'totalVentas', 'reserva_id']
        });

        const ventasIds = ventas.map(v => v.id);

        const detalles = await DetalleVenta.findAll({
            where: { ventas_id: ventasIds },
        });

        const ventasConDetalle = ventas.map(venta => {
            const detalle = detalles
                .filter(d => d.ventas_id === venta.id)
                .map(d => ({
                    formaPago: d.formaPago,
                    subTotal: d.subTotal,
                    descuento: d.descuento,
                    precioFinal: d.precioFinal
                }));

            return {
                reserva_id: venta.reserva_id,
                fecha: venta.fecha,
                hora: venta.hora,
                totalVentas: venta.totalVentas,
                detalleVenta: detalle
            };
        });

        const reservasConVentas = reservas.map(reserva => {
            const ventasDeReserva = ventasConDetalle.filter(v => v.reserva_id === reserva.id);
            return {
                fechaReserva: reserva.fechaReserva,
                ventas: ventasDeReserva.map(v => ({
                    fecha: v.fecha,
                    hora: v.hora,
                    totalVentas: v.totalVentas,
                    detalleVenta: v.detalleVenta
                }))
            };
        });

        res.status(200).json({
            viaje,
            reserva: reservasConVentas
        });

    } catch (error) {
        console.error('Error al obtener ventas por viaje:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
