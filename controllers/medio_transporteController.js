// controllers/medio_trasporteController.js
const { MedioTransporte, Empresa, Viajes } = require('../models');
const { Op } = require('sequelize');

// Obtener todos los transportes
exports.obtenerTransportes = async (req, res) => {
    try {
        const transportes = await MedioTransporte.findAll({
            attributes: ['id','nombre','patente','marca','cantLugares','empresa_id']
        });
        res.status(200).json(transportes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los transportes' });
    }
};

//obtener transporte por empresa
exports.obtenerTransportesPorEmpresa = async (req, res) => {
   

    try {
        const transportes = await MedioTransporte.findAll({
            attributes: ['id', 'nombre', 'patente', 'marca', 'cantLugares', 'empresa_id'],
            where: {
                empresa_id: req.params.id,
                eliminado: 'no' 
            },
             include: [{
                        model: Empresa, 
                        as: 'Empresa',
                        attributes: ['nombre']
                    }]
            
        });

        if (transportes.length === 0) {
            return res.status(404).json({ message: 'No hay transportes activos asociados a esta empresa.' });
        }

        res.status(200).json(transportes);
    } catch (error) {
        console.error("Error al obtener los transportes:", error);
        res.status(500).json({ error: 'Error al obtener los transportes.' });
    }
};


// Obtener un transporte por ID
exports.obtenerTransportePorId = async (req, res) => {
    try {
        const transporte = await MedioTransporte.findByPk(req.params.id, {
            attributes: ['id','nombre', 'patente', 'marca', 'cantLugares']
        });
        res.status(200).json(transporte); // Retorna el objeto si existe o `null` si no se encuentra
    } catch (error) {
        console.error("Error al obtener el transporte:", error);
        throw error;
    }
};
// Obtener un transporte por ID
exports.obtenerTransporteId = async (id) => {
    try {
        const transporte = await MedioTransporte.findByPk(id, {
            attributes: ['id', 'nombre', 'patente', 'marca', 'cantLugares', 'empresa_id']
        });
        return transporte; // Retorna el objeto si existe o `null` si no se encuentra
    } catch (error) {
        console.error("Error al obtener el transporte:", error);
        throw error;
    }
};

// Actualizar un transporte existente
/*exports.actualizarTransporte = async (req, res) => {
    try {
        // Especificar los campos que quieres actualizar
        const {nombre, cantLugares, empresa_id} = req.body
        
        const [actualizar] = await MedioTransporte.update({
            nombre:nombre,
            cantLugares:cantLugares,

        }, {
            where: { id: req.params.id },
            fields: ['nombre','cantLugares']// Solo estos campos serán actualizados
        });

        if (!actualizar) {
            return res.status(404).json({ error: 'Transporte no encontrado' });
        }
        res.status(200).json({ message: 'Transporte actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el transporte' });
    }
};*/


exports.actualizarTransporte = async (req, res) => {
  try {
    const { nombre, cantLugares } = req.body;
    const transporteId = req.params.id;

    // 1. Actualizar el transporte
    const [actualizado] = await MedioTransporte.update(
      { nombre, cantLugares },
      {
        where: { id: transporteId },
        fields: ['nombre', 'cantLugares'],
      }
    );

    if (!actualizado) {
      return res.status(404).json({ error: 'Transporte no encontrado' });
    }

    // 2. Obtener la fecha actual
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Ignorar hora para comparar solo fecha

    // 3. Actualizar cantPasajeros SOLO en los viajes futuros
    await Viajes.update(
      { cantPasajeros: cantLugares },
      {
        where: {
          medioTransporte_id: transporteId,
          fechaViaje: {
            [Op.gte]: hoy,//ver que onda la hora de salida
          },
        },
      }
    );

    res.status(200).json({
      message: 'Transporte actualizado y viajes futuros modificados correctamente',
    });
  } catch (error) {
    console.error('Error al actualizar transporte y viajes:', error);
    res.status(500).json({ error: 'Error al actualizar el transporte y sus viajes futuros' });
  }
};




// Crear un nuevo transporte
exports.crearTransporte = async (req, res) => {
    try {
        const { nombre, patente, marca, cantLugares, empresa_id } = req.body;
        
        // Crear el usuario con los campos separados
        const nuevoTransporte = await MedioTransporte.create({
            nombre: nombre,
            patente: patente,
            marca: marca,
            cantLugares:cantLugares,
            empresa_id:empresa_id,
           
        });
      res.status(201).json({ message: 'Transporte creado' });
    } catch (error) {
      
        res.status(500).json({ error: 'Errorr al crear el transporte' });
      }
    };
 


// Eliminar un transporte


exports.eliminarTransporte = async (req, res) => {
    try {
        
        // Verificar si el transporte tiene algún viaje asociado
        const viajesAsociados = await Viajes.findOne({
            where: { medioTransporte_id: req.params.id,
                 eliminado: 'no' }
        });

        if (viajesAsociados) {

            
            return res.status(400).json({ error: 'No se puede eliminar el transporte porque tiene viajes asignados.' });
        }

        // Marcar el transporte como eliminado
        const [eliminar] = await MedioTransporte.update(
            { eliminado: 'si' },
            {
                where: { id: req.params.id },
                fields: ['eliminado']
            }
        );

        if (!eliminar) {
            return res.status(404).json({ error: 'Transporte no encontrado' });
        }

        res.status(200).json({ message: 'Transporte eliminado correctamente' });
    } catch (error) {
       
        res.status(500).json({ error: 'Error al eliminar el Transporte' });
    }
};


exports.obtenerViajesPorTransporte = async (req, res) => {
    // ID del transporte recibido por la URL

    try {
        const viajes = await Viajes.findAll({
            where: {
                medioTransporte_id: req.params.id
            },
            attributes: [ 'origenLocalidad', 'destinoLocalidad', 'fechaViaje', 'horarioSalida','medioTransporte_id', 'cantPasajeros']
        });

        if (viajes.length === 0) {
            return res.status(200).json({ message: 'No hay viajes asignados a este transporte.', viajes });
        }

        res.status(200).json({message: 'El transporte posse viaje', viajes});
    } catch (error) {
        console.error("Error al obtener los viajes del transporte:", error);
        res.status(500).json({ error: 'Error al obtener los viajes del transporte.' });
    }
};

/*
exports.verificarTransporteSinReservas = async (req, res) => {
  try {
    const transporteId = req.params.id;

    const viajes = await Viajes.findAll({
      where: { medioTransporte_id: transporteId },
      attributes: ['id', 'cantPasajeros'],
      include: {
        model: MedioTransporte,
        attributes: ['cantLugares'],
      },
    });

    if (viajes.length === 0) {
      return res.status(200).json({
        sinReservas: false,
        message: 'No hay viajes asignados a este transporte.',
      });
    }

    // Verificar que todos los viajes tengan cantPasajeros igual a cantLugares
    const todosIguales = viajes.every(
      (viaje) => viaje.cantPasajeros === viaje.MedioTransporte.cantLugares
    );

    return res.status(200).json({ sinReservas: todosIguales });
  } catch (error) {
    console.error('Error al verificar si el transporte no tiene reservas:', error);
    return res.status(500).json({
      error: 'Error interno al verificar reservas del transporte.',
    });
  }
};
*/


//función devuelva true en 2 casos:

//Cuando los viajes futuros o actuales (fecha+hora ≥ ahora) tienen cantPasajeros === cantLugares.

//O cuando no hay viajes futuros ni actuales (es decir, todos los viajes son pasados o ya finalizaron).


exports.verificarTransporteSinReservas = async (req, res) => {
  try {
    const transporteId = req.params.id;
    const ahora = new Date();

    // Traemos todos los viajes del transporte con fecha >= hoy
    const viajes = await Viajes.findAll({
      where: {
        medioTransporte_id: transporteId,
        fechaViaje: { [Op.gte]: new Date(ahora.toDateString()) },
      },
      attributes: ['id', 'cantPasajeros', 'fechaViaje', 'horarioSalida'],
      include: {
        model: MedioTransporte,
        attributes: ['cantLugares'],
      },
    });

    // Filtrar viajes futuros o actuales comparando fecha + hora
    const viajesFuturos = viajes.filter(viaje => {
      const fecha = viaje.fechaViaje;
      const [hora, minutos, segundos] = viaje.horarioSalida.split(':').map(Number);

      const fechaHoraViaje = new Date(fecha);
      fechaHoraViaje.setHours(hora, minutos, segundos || 0, 0);

      return fechaHoraViaje >= ahora;
    });

    if (viajesFuturos.length === 0) {
      // No hay viajes futuros → devolvemos true
      return res.status(200).json({
        sinReservas: true,
        message: 'No hay viajes futuros, todos ya finalizaron.',
      });
    }

    // Para los viajes futuros, verificamos que cantPasajeros === cantLugares
    const todosIguales = viajesFuturos.every(
      (viaje) => viaje.cantPasajeros === viaje.MedioTransporte.cantLugares
    );

    return res.status(200).json({ sinReservas: todosIguales });
  } catch (error) {
    console.error('Error al verificar si el transporte no tiene reservas:', error);
    return res.status(500).json({
      error: 'Error interno al verificar reservas del transporte.',
    });
  }
};
