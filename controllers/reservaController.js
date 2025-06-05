const viajesController = require('../controllers/viajesController');
const medioTransporteController = require('../controllers/medio_transporteController');
const reservaUsuario = require('../controllers/reservaViajesController');
const { Reserva, Pasajeros, Viajes, MedioTransporte, Empresa} = require('../models/');
const { where } = require('sequelize');





// Obtener todas las reservas
exports.obtenerReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            attributes:['id','fechaReserva','usuarios_id','viajes_id']
        });
        res.status(200).json(reservas);
    } catch (error) {
        console.error('Error al obtener reservas:', error); 
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};



exports.obtenerReservasPorEmpresa = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      attributes: ['id', 'fechaReserva', 'usuarios_id', 'viajes_id'],
      include: [
        {
          model: Viajes,
          required: true,
          attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio'],
          include: [
            {
              model: MedioTransporte,
              required: true,
              attributes: ['id', 'nombre', 'patente', 'marca', 'cantLugares'],
              where: { empresa_id: req.params.id }, 
              include: [
                {
                  model: Empresa,
                  attributes: ['id', 'nombre']
                }
              ]
            }
          ]
        }
      ]
    });

    res.status(200).json(reservas);
  } catch (error) {
    console.error('Error al obtener reservas por empresa:', error);
    res.status(500).json({ error: 'Error al obtener las reservas por empresa' });
  }
};

// Obtener una reserva por ID
exports.obtenerReservaPorId = async (req, res) => {
    try {
        const reserva = await Reserva.findByPk(req.params.id, {
            attributes:['id','fechaReserva','usuarios_id','viajes_id']
        });
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reserva'});
    }
};

// Obtener una reserva por ID - Funcion que se ocupa internamente
exports.obtenerReservaId = async (id) => {
    try {
        const reserva = await Reserva.findByPk(id, {
            attributes:['id','fechaReserva','usuarios_id','viajes_id']
        });
        if (!reserva) {
            return console.error("Error al obtener la reserva:", error);
            
        }
        return reserva;
    } catch (error) {
        throw error;
    }
};

// Crear una nueva reserva
exports.crearReserva = async (req, res) => {
    try {
        const { usuarios_id, viajes_id, personas } = req.body;
        

        // Obtener el viaje y su medio de transporte
        const viaje = await viajesController.obtenerViajeId(viajes_id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'Viajee no encontrado' });
        }

        const medioTransporte = await medioTransporteController.obtenerTransporteId(viaje.medioTransporte_id);
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no encontrado' });
        }

        // Verificar si hay suficientes lugares disponibles antes de crear la reserva
        if (viaje.cantPasajeros < personas.length) {
            return res.status(400).json({ mensaje: 'No hay suficientes lugares disponibles en este viaje' });
        }

        
        // Verificar si el usuario ya tiene una reserva para este viaje
        const usuarioReserva = await reservaUsuario.obtenerReservaPorUsuarioYViaje(usuarios_id, viajes_id);
        if (usuarioReserva) {
            return res.status(400).json({ mensaje: 'El usuario ya posee una reserva para este viaje' });
        } 
        
        
        const fechaActual = new Date();

        // Crear la reserva principal, 
        const nuevaReserva = await Reserva.create({
            fechaReserva: fechaActual, 
            usuarios_id,
            viajes_id
        });
        

        // Iterar sobre el array de personas para crear los detalles de reserva
        for (const persona of personas) {
            await Pasajeros.create({
                nombre: persona.nombre,
                apellido: persona.apellido,
                dni: persona.dni,
                ubicacionOrigen: persona.ubicacionOrigen,
                ubicacionDestino: persona.ubicacionDestino,
                reserva_id: nuevaReserva.id 
            });
        }

        // Descontar los lugares correspondientes
        viaje.cantPasajeros -= personas.length;
        await viaje.save();

        res.status(201).json({ message: 'Reserva creada exitosamente', reserva: nuevaReserva });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la reserva' });
    }
};




// Actualizar una reserva existente
exports.actualizarReserva = async (req, res) => {
    try {
        const { nombre, apellido, dni, ubicacionOrigen, ubicacionDestino } = req.body;
        const fechaActual = new Date()
        
        const [actualizar] = await Pasajeros.update(
            {
       
                nombre: nombre,
                apellido: apellido,
                dni: dni,
                ubicacionOrigen: ubicacionOrigen,
                ubicacionDestino: ubicacionDestino
                
            },
            {
                where: { id: req.params.id },
                fields: ['nombre','apellido','dni','ubicacionOrigen', 'ubicacionDestino']
            }
        );

        const pasajero = await Pasajeros.findByPk(req.params.id);
        if (!pasajero) {
            return res.status(404).json({ error: 'Pasajero no encontrado' });
        }
        const actulizarFecha = await Reserva.update({
            fechaReserva: fechaActual// Asignar la fecha actual
        },
        {
            where: { id: pasajero.reserva_id },
            fields: ['fechaReserva']
        }
        )
        if (actualizar === 0) {
            return res.status(200).json({ message: 'No hubo cambios en los datos del pasajero' });
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

        // Actualizar el campo 'eliminado' de la reserva
        await reserva.update({ eliminado: 'si' });

        const pasajeros = await Pasajeros.findAll({ where: { reserva_id: req.params.id } })
        if (!pasajeros) {
            return res.status(404).json({ error: 'pasajero no encontrado' });
        }
        // Actualizar el campo 'eliminado' de los pasajeros
        await Pasajeros.update(
            { eliminado: 'si' }, 
            { where: { reserva_id: req.params.id } }
        );


        // Obtener el viaje y su medio de transporte
        const viaje = await viajesController.obtenerViajeId(reserva.viajes_id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        }

        const medioTransporte = await medioTransporteController.obtenerTransporteId(viaje.medioTransporte_id);
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no disponible' });
        }

        // Contar el número de pasajeros (personas) asociados con la reserva
        const cantidadPersonas = pasajeros.length;

        // Sumar los lugares correspondientes al medio de transporte
        viaje.cantPasajeros += cantidadPersonas;

        // Guardar los cambios realizados en el medio de transporte
        await viaje.save();

        // Responder con éxito
        res.status(200).json({ message: 'Reserva eliminada' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la reserva' });
    }
};

// Eliminar Pasajero
exports.eliminarPasajero = async (req, res) => {
    try {
        
        // Actualizar el campo 'eliminado' a 'si' 
        await Pasajeros.update({ eliminado: 'si' },
            { where: { id: req.params.id } }
        );
        
        //Guardo los datos del pasajero en la variable pasajeros
        const pasajeros = await Pasajeros.findOne({ where: { id: req.params.id } })
        
        //Obtengo la reserva del pasajero mediante reserva_id que esta en la variable pasajeros
        const reserva = await Reserva.findOne({ where: { id: pasajeros.reserva_id } });

        // Obtener el viaje y su medio de transporte
        const viaje = await viajesController.obtenerViajeId(reserva.viajes_id);
        if (!viaje) {
            return res.status(404).json({ mensaje: 'Viaje no encontrado' });
        } 

        const medioTransporte = await medioTransporteController.obtenerTransporteId(viaje.medioTransporte_id);
        if (!medioTransporte) {
            return res.status(404).json({ mensaje: 'Medio de transporte no disponible' });
        }

        // Sumar los lugares correspondientes al medio de transporte
        viaje.cantPasajeros += 1;

        // Guardar los cambios realizados en la base de datos
        await viaje.save();

        //evaluo si el pasajero eliminado es el ultimo
        const totalpasajeros = await Pasajeros.findAll({ where:
            { reserva_id: pasajeros.reserva_id ,
               eliminado:'no'
            } })
       const total= totalpasajeros.length;
      

       // Actualizar el campo 'eliminado' a 'si', si no quedan mas pasajeros para esa reserva
       if (total === 0) {
           await Reserva.update(
               { eliminado: 'si' },
               { where: { id: pasajeros.reserva_id } }
           );
       }
        res.status(200).json({ message: 'Pasajero eliminado' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el Pasajero' });
    }
};

exports.listarTodosLosPasajeros = async (req, res) => {
    try {
        const pasajeros = await Pasajeros.findAll({
            attributes: ['nombre', 'apellido', 'dni', 'ubicacionOrigen', 'ubicacionDestino']
        });

        if (!pasajeros.length) {
            return res.status(404).json({ error: 'No hay pasajeros registrados' });
        }

        res.status(200).json(pasajeros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pasajeros' });
    }
};

exports.listarPasajerosPorReserva = async (req, res) => {
    try {
        const pasajeros = await Pasajeros.findAll({
            where: { reserva_id: req.params.id },
            attributes: ['id', 'nombre', 'apellido', 'dni', 'ubicacionOrigen', 'ubicacionDestino']
        });
        if (!pasajeros) {
            return res.status(404).json({ error: `No se encontraron pasajeros para la reserva ` });
        }

        res.status(200).json(pasajeros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pasajeros de la reserva' });
    }
};

exports.listarPasajerosReserva = async (id) => {
    try {
        const pasajeros = await Pasajeros.findAll({
            where: { reserva_id: id },
            attributes: ['id', 'nombre', 'apellido', 'dni', 'ubicacionOrigen', 'ubicacionDestino']
        });
        if (!pasajeros) {
            return res.status(404).json({ error: `No se encontraron pasajeros para la reserva ` });
        }

        return pasajeros
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pasajeros de la reserva' });
    }
};
//nuevo
exports.listarPasajeroPorId= async (req, res) => {
    try {
        const pasajeros = await Pasajeros.findAll({
            where: { id: req.params.id },
            attributes: ['id', 'nombre', 'apellido', 'dni', 'ubicacionOrigen', 'ubicacionDestino']
        });
        if (!pasajeros) {
            return res.status(404).json({ error: `No se encontro pasajero para ese id` });
        }

        res.status(200).json(pasajeros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el pasajero por id' });
    }
};


//funcion para obtener reservas por uduario id y que esas reservas no esten eliminadas 
// nuevo
exports.obtenerReservasPorUsuario = async (req, res) => {
    try {
      const usuarioId = req.query.id;
     
  
      const reservas = await Reserva.findAll({
        attributes:['id','fechaReserva','usuarios_id','viajes_id'],
        where: { usuarios_id: usuarioId,
                 eliminado: 'no'
                }
        //order: [['fechaReserva', 'DESC']]
      });

    
       

      const viajesIds = reservas.map(r => r.viajes_id);
      console.log('los ids de viaje', viajesIds);

      if (viajesIds.length === 0) {
          return res.status(200).json([]);
      }
      const viajes = await Viajes.findAll({
        where: { id:viajesIds },
        attributes:['id','origenLocalidad','destinoLocalidad','horarioSalida','fechaViaje','precio','usuarioEmpresa_id','medioTransporte_id']
        
      })
      

      const reservasConViajes = reservas.map(reserva => {
        const viajeRelacionado = viajes.find(v => v.id === reserva.viajes_id);
        return {
          id: reserva.id,
          fechaReserva: reserva.fechaReserva,
          viaje: viajeRelacionado
        };
      });
      
      res.status(201).json(reservasConViajes);
    } catch (error) {
      console.error('Error al obtener las reservas del usuario:', error);
      res.status(500).json({ error: 'Error al obtener las reservas del usuario' });
    }
  };


  // funcion para listar los pasajeros segun el viaje
  exports.listarPasajerosPorViaje = async (req, res) => {
    try {
        const reservas = await Reserva.findAll({
            where: { viajes_id: req.params.id },
            attributes: ['id'],
            include: {
                model: Pasajeros,
                attributes: ['id', 'nombre', 'apellido', 'dni', 'ubicacionOrigen', 'ubicacionDestino']
            }
        });

        if (!reservas || reservas.length === 0) {
            return res.status(404).json({ error: 'No se encontraron reservas para este viaje.' });
        }

        // Extraer los pasajeros de las reservas
        const pasajeros = reservas.flatMap(reserva => reserva.Pasajeros || []);

        res.status(200).json(pasajeros);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los pasajeros del viaje.' });
    }
};

  
  
