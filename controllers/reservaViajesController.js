const { Reserva } = require('../models'); // Asegúrate de que la ruta al modelo sea correcta

// Obtener reserva por usuario y viaje
const obtenerReservaPorUsuarioYViaje = async (usuarios_id, viajes_id) => {
        try {

        const reserva = await Reserva.findOne({          
            where: {
                usuarios_id: usuarios_id,
                viajes_id: viajes_id
            },
            attributes:['id','ubicacionOrigen','ubicacionDestino','fechaReserva','usuarios_id','viajes_id'],
        });
        return reserva;// Retorna la reserva si existe, de lo contrario, retorna null
    } catch (error) {
        console.error('Error al verificar la reserva existente:', error);
        throw error; // Lanza el error para manejarlo en el controlador de la ruta
    }
};

module.exports = {
    obtenerReservaPorUsuarioYViaje,
};
