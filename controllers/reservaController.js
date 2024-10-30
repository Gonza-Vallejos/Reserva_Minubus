// controllers/reservaController.js
const { Reserva, Viajes } = require('../models/');
const viajesController = require('../controllers/viajesController');
const medioTransporteController = require('../controllers/medio_transporteController');


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
        const { ubicacionOrigen, ubicacionDestino, fechaReserva, usuarios_id, viajes_id } = req.body;

        // Forzar la conversión a número para usuarios_id y viajes_id
        const usuariosIdNumber = Number(usuarios_id);
        const viajesIdNumber = Number(viajes_id);

        if (isNaN(usuariosIdNumber) || isNaN(viajesIdNumber)) {
            return res.status(400).json({ error: 'usuarios_id o viajes_id no es un número válido' });
        }

        console.log('Datos de la solicitud:', { ubicacionOrigen, ubicacionDestino, fechaReserva, usuariosIdNumber, viajesIdNumber });

        // Verificar que el viaje existe antes de continuar
         // Obtener el viaje por ID
         const viaje = await viajesController.obtenerViajePorId(viajesIdNumber);

         if (!viaje) {
             return res.status(404).json({ mensaje: 'Viaje no encontrado' });
         }


        // Obtener el medio de transporte utilizando el id del viaje
        const medioTransporte = await medioTransporteController.obtenerTransportePorId(viaje.medioTransporte_id);
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no disponible' });
        }

        // Crear la reserva con los valores correctos y numéricos
        const nuevaReserva = await Reserva.create({
            ubicacionOrigen,
            ubicacionDestino,
            fechaReserva,
            usuarios_id: usuariosIdNumber,
            viajes_id: viajesIdNumber
        });

        res.status(201).json({ message: 'Reserva creada', reserva: nuevaReserva });
    } catch (error) {
        console.error("Error al crear la reserva:", error);
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
