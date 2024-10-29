// controllers/reservaController.js
const { Reserva } = require('../models');
const {viajesController} = require('../controllers/viajesController');


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
        const reserva = await Reservas.findByPk(req.query.id, {
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
         console.log('ver id viaje:', viajes_id )
         //const viajes_id = req.body.viajes_id; // o req.query.viajes_id
        const viajesIdNumber = parseInt(viajes_id, 10);

        // Verificar que el viaje existe
     console.log('Datos de la solicitud:', req.body);
        const viaje = await viajesController.obtenerViajePorId(viajesIdNumber);
        console.log('ver viaje data', viaje)
        // Validación para asegurarse de que el viaje existe y tiene datos
        if (!viaje || !viaje.data || !viaje.data.length) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        }
        // Inicializar variables
        let trasnporteid;
          console.log('que me trae viajedata', viaje.data)
        // Verificar si `viaje.data` existe y recorrer los datos
        if (viaje.data) {
            viaje.data.forEach((data) => {
                trasnporteid = data.medioTransporte_id;
                console.log(`TrasnporteID: ${trasnporteid}`);
            });
        }
          
    
        const id_medioTransporte = trasnporteid;
        // Verificar que el medio de transporte está disponible para ese viaje
        const medioTransporte = await medioTransporteController.obtenerTransportePorId(id_medioTransporte);
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no disponible' });
        }
        // Crear el usuario con los campos separados
        const nuevaReserva = await Reserva.create({
            ubicacionOrigen: ubicacionOrigen,
            ubicacionDestino: ubicacionDestino,
            fechaReserva: fechaReserva,
            usuarios_id:usuarios_id,
            viajes_id:viajes_id,
           
        });
      res.status(201).json({ message: 'Reserva creada' });
    } catch (error) {
        // Captura otros tipos de errores
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
