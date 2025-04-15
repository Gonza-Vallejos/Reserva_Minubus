const { Reserva, Viajes, Pasajeros} = require('../models'); 
const viajesController = require('../controllers/viajesController');

// Obtener reserva por usuario y viaje
exports.obtenerPasajerosPorViaje = async ( req, res) => {
        try {

        const viaje = await viajesController.obtenerViajeId(req.params.id)

        const reservas = await Reserva.findAll({          
            where: {
                viajes_id: req.params.id
            },
            attributes:['id','fechaReserva'],
        });
         // 2. Extraer los IDs de las reservas
         const reservasIds = reservas.map(r => r.id);

         if (reservasIds.length === 0) {
             return []; // No hay reservas, por lo tanto no hay pasajeros
         }
       
        const pasajeros =  await Pasajeros.findAll({          
            where: {
                reserva_id: reservasIds
            },
            attributes:['id','nombre', 'apellido', 'dni',  'ubicacionOrigen', 'ubicacionDestino', 'reserva_id'],
        });

 
        const reservasConPasajeros = reservas.map(reserva => {
            const pasajerosDeReserva = pasajeros.filter(p => p.reserva_id === reserva.id);
            return {
                ...reserva.toJSON(),
                pasajeros: pasajerosDeReserva
            };
        });

        // 6. Enviar respuesta con viaje y reservas + pasajeros
        res.status(200).json({
            viaje,
            reserva: reservasConPasajeros
        });
       
       
    } catch (error) {
        console.error('Error al verificar la reserva existente:', error);
        throw error; 
    }
};





