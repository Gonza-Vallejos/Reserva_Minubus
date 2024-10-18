const viajesController = require('../controllers/viajesController');
const medioTransporteController = require('../controllers/medio_transporteController');
const reservaController = require('../controllers/reservaController');


const reservarPasaje = async (req, res) => {
    try {
        const { id_viaje, usuarioId } = req.body;

        // Verificar que el viaje existe
        const viaje = await viajesController.obtenerViajePorId(id_viaje);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        }
        const id_medioTransporte = viaje.medioTransporte_id
        // Verificar que el medio de transporte está disponible para ese viaje
        const medioTransporte = await medioTransporteController.obtenerTransportePorId(id_medioTransporte);
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no disponible' });
        }

        // Verificar si el usuario ya tiene una reserva para ese viaje
        const reservaExistente = await reservaController.obtenerReservaPorUsuarioYViaje(usuarioId, id_viaje);
        if (reservaExistente) {
            return res.status(400).json({ mensaje: 'El usuario ya tiene una reserva para este viaje.' });
        }

        // Verificar si hay asientos disponibles en el medio de transporte
        if (medioTransporte.cantLugares <= 0) {
            return res.status(400).json({ mensaje: 'No hay asientos disponibles para este medio de transporte.' });
        }

        // Crear una nueva reserva
        const nuevaReserva = {
            usuarioId,
            viajeId: id_viaje,
            medioTransporteId: id_medioTransporte,
            fechaReserva: new Date()
        };

        // Crear la reserva
        const reserva = await reservaController.crearReserva(nuevaReserva);

        // Restar un asiento disponible en el medio de transporte
        await medioTransporteController.restarAsiento(id_medioTransporte);

        return res.status(201).json({
            mensaje: 'Reserva creada exitosamente',
            reserva
        });

    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al realizar la reserva', error });
    }
};

module.exports = {
    reservarPasaje
};

// Obtener medio de transporte por ID
const obtenerMedioTransportePorId = async (id) => {
    try {
        const medioTransporte = await MedioTransporte.findByPk(id);
        return medioTransporte;
    } catch (error) {
        console.error('Error al obtener el medio de transporte:', error);
        throw error;
    }
};

// Restar un asiento disponible después de realizar una reserva
const restarAsiento = async (id) => {
    try {
        const medioTransporte = await MedioTransporte.findByPk(id);

        if (medioTransporte.asientosDisponibles > 0) {
            medioTransporte.asientosDisponibles -= 1; // Restar un asiento disponible
            await medioTransporte.save(); // Guardar los cambios en la base de datos
        } else {
            throw new Error('No hay asientos disponibles.');
        }
    } catch (error) {
        console.error('Error al restar un asiento:', error);
        throw error;
    }
};

module.exports = {
    obtenerMedioTransportePorId,
    restarAsiento
};

const obtenerReservaPorUsuarioYViaje = async (usuarioId, viajeId) => {
    try {
        const reserva = await Reserva.findOne({
            where: {
                usuarioId: usuarioId,
                viajeId: viajeId
            }
        });

        return reserva; // Si hay una reserva, retornará el objeto reserva, de lo contrario null
    } catch (error) {
        console.error('Error al verificar la reserva existente:', error);
        throw error;
    }
};

module.exports = {
    obtenerReservaPorUsuarioYViaje,
    crearReserva
    // otros métodos...
};
