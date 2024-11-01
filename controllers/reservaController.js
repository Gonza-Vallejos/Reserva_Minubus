// controllers/reservaController.js
const { Reserva, sequelize } = require('../models/');
const viajesController = require('../controllers/viajesController');
const medioTransporteController = require('../controllers/medio_transporteController');
const { DATE } = require('sequelize');


// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            attributes:['id','ubicacionOrigen','ubicacionDestino','fechaReserva','usuario_id','viajes_id']
        });
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

// Obtener una reserva por ID
exports.obtenerReservaPorId = async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.query.id, {
            attributes:['id','ubicacionOrigen','ubicacionDestino','fechaReserva','usuario_id','viajes_id']
        });
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reserva' });
    }
};

// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
    try {
        const { ubicacionOrigen, ubicacionDestino, usuarios_id, viajes_id } = req.body;
      
        // Obtener el viaje y su medio de transporte
        const viaje = await viajesController.obtenerViajeId(viajes_id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        }
          
          
        const medioTransporte = await medioTransporteController.obtenerTransporteId(viaje.medioTransporte_id);
      
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no disponible' });
        }

        // Verificar si hay lugares disponibles
        if (medioTransporte.cantLugares <= 0) {
            return res.status(400).json({ mensaje: 'No hay lugares disponibles en este medio de transporte' });
        }
      
          // Crear la reserva
         const nuevaReserva = await Reserva.create({
            ubicacionOrigen,
            ubicacionDestino,
            fechaReserva: 
            usuarios_id,
            viajes_id
        });

        // Descontar un lugar en el medio de transporte
        medioTransporte.cantLugares -= 1;
        await medioTransporte.save();
        
       
        res.status(201).json({ message: 'Reserva creada', reserva: nuevaReserva });
        
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};


// Actualizar una reserva existente
exports.actualizarReserva = async (req, res) => {
    try {
        const camposActualizados = ['ubicacionOrigen','ubicacionDestino','fechaReserva']; 
        const [actualizar] = await Reserva.update(req.body, {
            where: { id: req.params.id },
            fields: camposActualizados
        });
        if (!actualizar) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Reserva actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
};

// Eliminar una reserva
exports.eliminarReserva = async (req, res) => {
        try {
        // Actualizar el campo 'eliminado' a 'si'
        const [eliminar] = await Reserva.update({ eliminado: 'si' }, {
            where: { id: req.params.id },
            fields: ['eliminado']
        });

        if (!eliminar) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Reserva eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la Reserva' });
    }
};
