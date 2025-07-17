// controllers/viajesController.js
const { Viajes, MedioTransporte, Empresa, UsuarioEmpresa, Usuario, Reserva } = require('../models');
const medioTransporteId = require('../controllers/medio_transporteController');
const usuarioEmpresaId = require('../controllers/usuarioEmpresaController');
const { sequelize } = require('../models');

// Obtener todas los viajes
exports.obtenerViajes = async (req, res) => {
    try {
        const viajes = await Viajes.findAll({
            attributes:['id','origenLocalidad','destinoLocalidad','horarioSalida','fechaViaje','precio','usuarioEmpresa_id','medioTransporte_id']
        });
        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los viajes' });
    }
};

// Obtener una Viaje por ID
exports.obtenerViajePorId = async (req, res) => {
    try {
        console.log('ver id en viaje', req.params.id)
        const viaje = await Viajes.findByPk(req.params.id, {
            attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio', 'usuarioEmpresa_id', 'medioTransporte_id']
        });
        if (!viaje) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.status(200).json(viaje);
    } catch (error) {
        console.error("Error al obtener el viaje:", error);
        throw error;
    }
};
// Obtener una Viaje por ID
exports.obtenerViajeId = async (id) => {
    try {
        const viaje = await Viajes.findByPk(id, {
            attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio','cantPasajeros', 'usuarioEmpresa_id', 'medioTransporte_id']
        });
        return viaje;
    } catch (error) {
        console.error("Error al obtener el viaje:", error);
        throw error;
    }
};

exports.obtenerViajesPorEmpresa = async (req, res) => {
    try {
    
        // Obtener los viajes
        const viajes = await Viajes.findAll({
            attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio', 'cantPasajeros','usuarioEmpresa_id', 'medioTransporte_id']
            ,where: { eliminado: 'no' },
            include: [
                {
                    model: MedioTransporte,
                    attributes: ['id', 'nombre', 'patente', 'marca', 'cantLugares'],
                    where: { empresa_id: req.params.id },
                    include: [
                        {
                            model: Empresa,
                            attributes: ['id', 'nombre', 'direccion', 'telefono']
                        }
                    ]
                }
            ]
        });
        console.log('viajes de la empresa',viajes)
        res.status(200).json(viajes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los viajes por empresa' });
    }
};


//obtener viajes segun el chofer


exports.obtenerViajesPorChofer = async (req, res) => {
  

  try {
    const viajes = await Viajes.findAll({
      attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio'],
      include: [
        {
          model: UsuarioEmpresa,
      
          attributes: [],
          where: { id_usuario: req.params.id }, 
          include: [
            {
              model: Usuario,
              attributes: [],
              where: {
                perfil_id: 4,
                eliminado: 'no'
              }
            },
            {
              model: Empresa,
              attributes: [ 'nombre']
            }
          ]
        },
        {
          model: MedioTransporte,
          attributes: ['id', 'nombre'],
          include: [
            {
              model: Empresa,
              attributes: ['nombre']
            }
          ]
        }
      ],
     where: sequelize.where(
                    sequelize.col('UsuarioEmpresa.id_empresa'),
                    '=',
                    sequelize.col('MedioTransporte.empresa_id')
                    )

    });
    if (viajes.length === 0) {
          return res.status(200).json({ message: 'El chofer no posee viajes', viajes: [] });
        }

    res.status(200).json({ message: 'El chofer posee un viaje', viajes });

  } catch (error) {
    console.error("Error al obtener los viajes del chofer:", error);
    res.status(500).json({ error: 'Error al obtener los viajes del chofer' });
  }
};

// Crear una nuevo Viaje
exports.crearViaje = async (req, res) => {
  try {
    const { origenLocalidad, destinoLocalidad, horarioSalida, fechaViaje, precio, usuarioEmpresa_id, medioTransporte_id } = req.body;


        // Obtener la empresa asociada al medioTransporte
  
    const transporte = await MedioTransporte.findOne({
      where: { id: medioTransporte_id },
      attributes: ['id', 'empresa_id', 'cantLugares']
    });
   
    if (!transporte) {
      return res.status(400).json({ error: 'El medioTransporte_id no es válido' });
    }

    const empresaTransporteId = transporte.empresa_id;
    // Verificar usuarioEmpresa_id y que sea chofer
   
    const usuarioEmpresa = await UsuarioEmpresa.findOne({ 
      where: { id: usuarioEmpresa_id },
      include: [{
        model: Usuario,
        where: { perfil_id: 4 }, // Verifica que sea usuarioChofer
        attributes: ['id', 'nombre', 'perfil_id']
      }]
    });
   
    if (!usuarioEmpresa) {
      return res.status(400).json({ error: 'El usuarioEmpresa_id no es válido o el usuario no tiene perfil de chofer' });
    }

    const empresaUsuarioId = usuarioEmpresa.id_empresa;

    
    

    // Comparar ambas empresas
    if (empresaUsuarioId !== empresaTransporteId) {
      return res.status(400).json({ error: 'El usuario no pertenece a la misma empresa que el medio de transporte' });
    }

    // Si todo es válido, crear el viaje
    const nuevoViaje = await Viajes.create({
      origenLocalidad: origenLocalidad,
      destinoLocalidad: destinoLocalidad,
      horarioSalida: horarioSalida,
      fechaViaje: fechaViaje,
      precio: precio,
      cantPasajeros: transporte.cantLugares,
      usuarioEmpresa_id: usuarioEmpresa_id,
      medioTransporte_id: medioTransporte_id
    });

    res.status(201).json({ message: 'Viaje creado exitosamente', viaje: nuevoViaje });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el Viaje' });
  }
};


// Actualizar un viaje existente
exports.actualizarViajes = async (req, res) => {
    try {
        const camposActualizados = ['origenLocalidad','destinoLocalidad','horarioSalida','fechaViaje','precio','usuarioEmpresa_id','medioTransporte_id'];
        const [actualizarViaje] = await Viajes.update(req.body, {
            where: { id: req.params.id },
            fields: camposActualizados
        });
        if (!actualizarViaje) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.status(200).json({ message: 'Viaje actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};

// Eliminar un Viaje

exports.eliminarViajes = async (req, res) => {
  try {
    // Buscar el viaje primero
    const viaje = await Viajes.findByPk(req.params.id);

    if (!viaje) {
      return res.status(404).json({ error: 'Viaje no encontrado' });
    }

    // Validar si la fecha del viaje ya pasó
    const fechaActual = new Date();
    if (new Date(viaje.fechaViaje) < fechaActual) {
      return res
        .status(400)
        .json({ error: 'No se puede eliminar un viaje que ya ocurrió' });
    }

    // Verificar reservas asociadas (solo si el viaje es futuro)
    const reservasAsociados = await Reserva.findOne({
      where: { viajes_id: req.params.id, eliminado: 'no' },
    });

    if (reservasAsociados) {
      return res
        .status(400)
        .json({ error: 'No se puede eliminar el viaje porque tiene reservas asignadas.' });
    }

    // Actualizar el campo 'eliminado' a 'si'
    const [eliminar] = await Viajes.update(
      { eliminado: 'si' },
      {
        where: { id: req.params.id },
        fields: ['eliminado'],
      }
    );

    if (!eliminar) {
      return res.status(404).json({ error: 'Viaje no encontrado' });
    }

    res.status(200).json({ message: 'Viaje eliminado' });
  } catch (error) {
    console.error('Error en eliminarViajes:', error);
    res.status(500).json({ error: 'Error al eliminar el viaje' });
  }
};


exports.existeReservaParaViaje = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await Reserva.findOne({
      where: { viajes_id: id },
    });

    const existe = !!reserva;

    res.status(200).json({ existe });
  } catch (error) {
    console.error('Error al verificar la reserva del viaje:', error);
    res.status(500).json({ error: 'Error al verificar la reserva del viaje' });
  }
};



