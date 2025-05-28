const { Reserva, Pasajeros, Usuario} = require('../models'); 

exports.obtenerReservaPorUsuarioYViaje = async (usuarios_id, viajes_id) => {
        try {

        const reserva = await Reserva.findOne({          
            where: {
                usuarios_id: usuarios_id,
                viajes_id: viajes_id
            },
            attributes:['id','fechaReserva','usuarios_id','viajes_id'],
        });
        return reserva;// Retorna la reserva si existe, de lo contrario, retorna null
    } catch (error) {
        console.error('Error al verificar la reserva existente:', error);
        throw error; 
    }
};

exports.listarReservasPorViaje = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: { viajes_id: req.params.id, eliminado: 'no' },
            attributes: ['id', 'usuarios_id', 'fechaReserva',], // agregá los campos que necesites
            include: [
                {
                    model: Usuario, // si querés incluir al usuario que hizo la reserva
                    attributes: ['nombre', 'apellido']
                },
                {
                    model: Pasajeros, // si querés incluir los pasajeros de cada reserva
                    attributes: ['nombre', 'apellido']
                }
            ]
        });

        if (!reservas || reservas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron reservas para este viaje.' });
        }

        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las reservas del viaje.' });
    }
};





