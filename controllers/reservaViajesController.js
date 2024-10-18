const { Reserva } = require('../models'); // Asegúrate de que la ruta al modelo sea correcta

// Obtener reserva por usuario y viaje
const obtenerReservaPorUsuarioYViaje = async (usuarioId, viajeId) => {
    try {
        const reserva = await Reserva.findOne({          
            where: {
                usuarioId: usuarioId,
                viajeId: viajeId
            },
            attributes:['id','ubicacionOrigen','ubicacionDestino','fechaReserva','usuario_id','viajes_id'],
        });
        res.status(200).json(reserva) // Retorna la reserva si existe, de lo contrario, retorna null
    } catch (error) {
        console.error('Error al verificar la reserva existente:', error);
        throw error; // Lanza el error para manejarlo en el controlador de la ruta
    }
};

module.exports = {
    obtenerReservaPorUsuarioYViaje,
};
