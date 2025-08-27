const { Reserva, Ventas, DetalleVenta } = require("../models");
const viajesController = require("../controllers/viajesController");

// Obtener ventas por viaje (detalleVenta a nivel plano)
exports.obtenerVentasPorViaje = async (req, res) => {
  try {
    const viajeCompleto = await viajesController.obtenerViajeId(req.params.id);
    if (!viajeCompleto) {
      return res.status(404).json({ mensaje: "Viaje no encontrado" });
    }

    const { id, medioTransporte_id, ...viaje } = viajeCompleto.toJSON();

    const reservas = await Reserva.findAll({
      where: { viajes_id: req.params.id },
      attributes: ["id", "fechaReserva"],
    });

    const reservasIds = reservas.map((r) => r.id);
    if (reservasIds.length === 0) {
      return res.status(200).json([]);
    }

    const ventas = await Ventas.findAll({
      where: { reserva_id: reservasIds },
      attributes: ["id", "fecha", "hora", "totalVentas", "reserva_id"],
    });

    const ventasIds = ventas.map((v) => v.id);

    const detalles = await DetalleVenta.findAll({
      where: { ventas_id: ventasIds },
    });

    const resultado = [];

    for (const venta of ventas) {
      const reserva = reservas.find((r) => r.id === venta.reserva_id);
      const detallesVenta = detalles.filter((d) => d.ventas_id === venta.id);

      if (detallesVenta.length === 0) {
        resultado.push({
          ...viaje,
          fechaReserva: reserva ? reserva.fechaReserva : null,
          fecha: venta.fecha,
          hora: venta.hora,
          totalVentas: venta.totalVentas,
          formaPago: null,
          subTotal: null,
          descuento: null,
          precioFinal: null,
        });
      } else {
        detallesVenta.forEach((d) => {
          resultado.push({
            ...viaje,
            fechaReserva: reserva ? reserva.fechaReserva : null,
            fecha: venta.fecha,
            hora: venta.hora,
            totalVentas: venta.totalVentas,
            formaPago: d.formaPago,
            subTotal: d.subTotal,
            descuento: d.descuento,
            precioFinal: d.precioFinal,
          });
        });
      }
    }

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al obtener ventas por viaje:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
