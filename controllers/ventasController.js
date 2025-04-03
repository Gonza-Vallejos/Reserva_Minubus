// controllers/ventasController.js
const { Ventas,Pasajeros,Reserva,Viajes,DetalleVenta } = require('../models');
const { listarPasajerosPorReserva } = require('./reservaController');
const ventasController = require('../controllers/ventasController');
const viajesController = require('../controllers/viajesController');
const reservaController = require('../controllers/reservaController');

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Ventas.findAll({
            attributes:['id','fecha','hora','totalVentas','reserva_id']
        });
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};

// Obtener una Venta por ID
exports.obtenerVentasPorId = async (req, res) => {
    try {
        const ventas = await Ventas.findByPk(req.query.id, {
            attributes:['id','fecha','hora','totalVentas','reserva_id']
        });
        if (!ventas) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
};

// Obtener una Venta por ID
exports.obtenerVentasId = async (id) => {
    try {
        const ventas = await Ventas.findByPk(id, {
            attributes:['id','fecha','hora','totalVentas','reserva_id']
        });
        if (!ventas) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
       return ventas;
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
};
// Crear una nueva Venta
exports.crearVenta = async (req, res) => {
    try {
        const { reserva_id } = req.body;
        console.log(req.body);

        let cantidadPasajeros = 0; // Declarar la variable antes del try interno

        try {
            cantidadPasajeros = await Pasajeros.count({
                where: { reserva_id: reserva_id }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error al contar los pasajeros de la reserva' });
        }

        console.log('ver pasajeros: ', cantidadPasajeros);

        const totalVentas = cantidadPasajeros;
        const fechaActual = new Date();

        const horaString = fechaActual.toLocaleTimeString('es-ES', { hour12: false });

        console.log("Hora:", horaString);

        // Crear la venta con los campos necesarios
        const nuevaVenta = await Ventas.create({
            fecha: fechaActual,
            hora: horaString,
            totalVentas: totalVentas,
            reserva_id: reserva_id,
        });

        res.status(201).json({ message: 'Venta creada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la venta' });
    }
};

// Actualizar una venta existente
exports.actualizarVentas = async (req, res) => {
    try {
        
        const [actualizarVenta] = await Ventas.update(req.body, {
            where: { id: req.params.id }
            
        });
        if (!actualizarVenta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json({ message: 'Venta actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};

// Eliminar una venta
exports.eliminarVentas= async (req, res) => {
    try {
        // Actualizar el campo 'eliminado' a 'si'
        const [eliminar] = await Ventas.update({ eliminado: 'si' }, {
            where: { id: req.params.id },
            fields: ['eliminado']
        });

        if (!eliminarVenta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json({ message: 'Venta eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
};


exports.crearDetalleVenta= async (req, res) =>{

    try {
        const { formaPago, descuento, ventas_id } = req.body;

        const ventas = await ventasController.obtenerVentasId(ventas_id);
        if (!ventas) {
            return res.status(404).json({ mensaje: 'venta no encontrado' });
        }
        


        const reserva = await reservaController.obtenerReservaId(ventas.reserva_id);
        if (!reserva) {
            return res.status(404).json({ mensaje: 'Reserva no encontrada' });
        }

        const viaje = await viajesController.obtenerViajeId(reserva.viajes_id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        }


        const subTotal = (viaje.precio * ventas.totalVentas);
        console.log('ver precio', subTotal);

        
        const precioFinal = (subTotal - descuento);

        console.log('ver precio final', precioFinal);

        // Crear detalle venta con los campos necesarios
        const nuevoDetalleVenta = await DetalleVenta.create({
            formaPago: formaPago,
            subTotal: subTotal,
            descuento: descuento,
            precioFinal: precioFinal,
            ventas_id: ventas_id,
        });

        res.status(201).json({ message: 'detalle venta creado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear  detalle venta' });
    }


}