// controllers/reservaController.js
const { Reserva, Viajes,DetalleReserva } = require('../models/');
const viajesController = require('../controllers/viajesController');
const medioTransporteController = require('../controllers/medio_transporteController');
const resrvaUsuario = require('../controllers/reservaViajesController')



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
/*
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

         // Verificar si el usuario ya tiene una reserva para este viaje
         const usuarioReserva = await resrvaUsuario.obtenerReservaPorUsuarioYViaje(usuarios_id, viajes_id);
         if (usuarioReserva) {
             return res.status(400).json({ mensaje: 'El usuario ya posee una reserva para este viaje' });
         }

        const fechaActual = new Date();
        console.log('ver fecha actual en el crear reserva', fechaActual)
          // Crear la reserva
         const nuevaReserva = await Reserva.create({
            ubicacionOrigen,
            ubicacionDestino,
            fechaReserva:fechaActual.toLocaleString(), 
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
};*/
// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
    try {
        const { usuarios_id, viajes_id, personas } = req.body;

        // Obtener el viaje y su medio de transporte
        const viaje = await viajesController.obtenerViajeId(viajes_id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        }

        const medioTransporte = await medioTransporteController.obtenerTransporteId(viaje.medioTransporte_id);
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no disponible' });
        }

        // Verificar si hay suficientes lugares disponibles antes de crear la reserva
        if (medioTransporte.cantLugares < personas.length) {
            return res.status(400).json({ mensaje: 'No hay suficientes lugares disponibles en este medio de transporte' });
        }

        
        /*
        // Verificar si el usuario ya tiene una reserva para este viaje
        const usuarioReserva = await resrvaUsuario.obtenerReservaPorUsuarioYViaje(usuarios_id, viajes_id);
        if (usuarioReserva) {
            return res.status(400).json({ mensaje: 'El usuario ya posee una reserva para este viaje CC' });
        } */
        
        const fechaActual = new Date();

        // Crear la reserva principal, 
        const nuevaReserva = await Reserva.create({
            fechaReserva: fechaActual, 
            usuarios_id,
            viajes_id
        });
        console.log('reserva principal anda');

        // Iterar sobre el array de personas para crear los detalles de reserva
        for (const persona of personas) {
            await DetalleReserva.create({
                nombre: persona.nombre,
                ubicacionOrigen: persona.ubicacionOrigen,
                ubicacionDestino: persona.ubicacionDestino,
                reserva_id: nuevaReserva.id
            });
        }

        // Descontar los lugares correspondientes
        medioTransporte.cantLugares -= personas.length;
        await medioTransporte.save();

        res.status(201).json({ message: 'Reserva creada con detalles', reserva: nuevaReserva });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};




// Actualizar una reserva existente
exports.actualizarReserva = async (req, res) => {
    try {
        const { ubicacionOrigen, ubicacionDestino } = req.body;
        const fechaActual = new Date()

        const [actualizar] = await Reserva.update(
            {
                ubicacionOrigen: ubicacionOrigen,
                ubicacionDestino: ubicacionDestino,
                fechaReserva: fechaActual.toLocaleString() // Asignar la fecha actual
            },
            {
                where: { id: req.params.id },
                fields: ['ubicacionOrigen', 'ubicacionDestino', 'fechaReserva']
            }
        );

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
        // Obtener la reserva a eliminar
        const reserva = await Reserva.findOne({ where: { id: req.params.id } });

        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }

        // Actualizar el campo 'eliminado' a 'si'
        await reserva.update({ eliminado: 'si' });

        // Obtener el viaje y su medio de transporte
        const viaje = await viajesController.obtenerViajeId(reserva.viajes_id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        }

        const medioTransporte = await medioTransporteController.obtenerTransporteId(viaje.medioTransporte_id);
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no disponible' });
        }

        // Contar el número de detalles asociados con la reserva (cada detalle representa una persona)
        const detallesReserva = await DetalleReserva.findAll({ where: { reserva_id: reserva.id } });
        const cantidadPersonas = detallesReserva.length;

        // Sumar los lugares correspondientes al medio de transporte
        medioTransporte.cantLugares += cantidadPersonas;

        // Guardar los cambios realizados en la base de datos
        await medioTransporte.save();

        res.status(200).json({ message: 'Reserva eliminada y lugares devueltos' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
};
