// controllers/viajesController.js
const { Viajes, MedioTransporte, Empresa, UsuarioEmpresa } = require('../models');

// Obtener todas los viajes
exports.obtenerViajes = async (req, res) => {
    try {
        const viajes = await Viajes.findAll({
            attributes:['id','origenLocalidad','destinoLocalidad','horarioSalida','fechaViaje','precio','chofer','medioTransporte_id']
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
            attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio', 'chofer', 'medioTransporte_id']
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
            attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio', 'chofer', 'medioTransporte_id']
        });
        return viaje;
    } catch (error) {
        console.error("Error al obtener el viaje:", error);
        throw error;
    }
};

exports.obtenerViajesPorEmpresa = async (req, res) => {
    //const empresaId = req.params.id;
    
   // const perfilUsuario = req.user.perfil;

    try {
       // const {usuarioId} = req.body;
        // Validar si el usuario tiene el perfil correcto
       // if (![1, 3].includes(perfilUsuario)) {
         //   return res.status(403).json({ error: 'No tienes permisos para acceder a estos datos' });
        //}

        // Verificar si el usuario está asociado a la empresa
      //  const asociacion = await UsuarioEmpresa.findOne({
        //    where: {
          //      usuario_id: usuarioId,
            //    empresa_id: req.params.id
           // }
       // });

        //if (!asociacion) {
          //  return res.status(403).json({ error: 'No estás asociado a esta empresa' });
        //}

        // Obtener los viajes
        const viajes = await Viajes.findAll({
            attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'horarioSalida', 'fechaViaje', 'precio', 'chofer', 'medioTransporte_id'],
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

        res.status(200).json(viajes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los viajes por empresa' });
    }
};



// Crear una nuevo Viaje
exports.crearViaje = async (req, res) => {
  try {
    const { origenLocalidad, destinoLocalidad, horarioSalida, fechaViaje, precio, usuarioEmpresa_id, medioTransporte_id } = req.body;

    // Verificar usuarioEmpresa_id y que sea chofer
    const usuarioEmpresa = await db.usuarioEmpresa.findOne({ //el db NOOO!!! ANDA!!!
      where: { id: usuarioEmpresa_id },
      include: [{
        model: db.Usuario,//el db NOOO!!! ANDA!!!
        where: { perfil_id: 4 }, // Verifica que sea usuarioChofer
        attributes: ['id', 'nombre', 'perfil_id']
      }]
    });

    if (!usuarioEmpresa) {
      return res.status(400).json({ error: 'El usuarioEmpresa_id no es válido o el usuario no tiene perfil de chofer' });
    }

    const empresaUsuarioId = usuarioEmpresa.id_empresa;

    // Obtener la empresa asociada al medioTransporte
    const medioTransporte = await db.MedioTransporte.findOne({//el db NOOO!!! ANDA!!!
      where: { id: medioTransporte_id },
      attributes: ['id', 'empresa_id']
    });

    if (!medioTransporte) {
      return res.status(400).json({ error: 'El medioTransporte_id no es válido' });
    }

    const empresaTransporteId = medioTransporte.empresa_id;

    // Comparar ambas empresas
    if (empresaUsuarioId !== empresaTransporteId) {
      return res.status(400).json({ error: 'El usuario no pertenece a la misma empresa que el medio de transporte' });
    }

    // Si todo es válido, crear el viaje
    const nuevoViaje = await db.Viajes.create({//el db NOOO!!! ANDA!!!
      origenLocalidad: origenLocalidad,
      destinoLocalidad: destinoLocalidad,
      horarioSalida: horarioSalida,
      fechaViaje: fechaViaje,
      precio: precio,
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
        const camposActualizados = ['origenLocalidad','destinoLocalidad','orarioSalida','fechaViaje','precio','chofer','medioTransporte_id'];
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
exports.eliminarViajes= async (req, res) => {
    try {
        // Actualizar el campo 'eliminado' a 'si'
        const [eliminar] = await Viajes.update({ eliminado: 'si' }, {
            where: { id: req.params.id },
            fields: ['eliminado']
        });

        if (!eliminar) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.status(200).json({ message: 'Viaje eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el viaje' });
    }




};