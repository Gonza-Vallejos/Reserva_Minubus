// controllers/medio_trasporteController.js
const { MedioTransporte, Empresa, Viajes } = require('../models');

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
            attributes: ['nombre', 'patente', 'marca', 'cantLugares']
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
exports.actualizarTransporte = async (req, res) => {
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
            attributes: [ 'origenLocalidad', 'destinoLocalidad', 'fechaViaje', 'horarioSalida','medioTransporte_id']
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

