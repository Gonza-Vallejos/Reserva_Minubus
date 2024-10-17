// controllers/medio_trasporteController.js
const { MedioTransporte } = require('../models');

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

// Obtener un transporte por ID
exports.obtenerTransportePorId = async (req, res) => {
    try {
        const transportes = await MedioTransporte.findByPk(req.params.id, {
            attributes: ['id','nombre','patente','marca','cantLugares','empresa_id']
        });

        if (!transportes) {
            return res.status(404).json({ error: 'transporte no encontrado' });
        }
        res.status(200).json(transportes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el transporte' });
    }
};

// Actualizar un transporte existente
exports.actualizarTransporte = async (req, res) => {
    try {
        // Especificar los campos que quieres actualizar
        const camposActualizados = ['nombre','cantLugares']; 

        
        const [actualizar] = await MedioTransporte.update(req.body, {
            where: { id: req.params.id },
            fields: camposActualizados // Solo estos campos serán actualizados
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
      
        res.status(500).json({ error: 'Error al crear el transporte' });
      }
    };
 


// Eliminar un transporte
exports.eliminarTransporte = async (req, res) => {
    
    try {
        // Actualizar el campo 'eliminado' a 'si'
        const [eliminar] = await MedioTransporte.update({ eliminado: 'si' }, {
            where: { id: req.params.id },
            fields: ['eliminado']
        });

        if (!eliminar) {
            return res.status(404).json({ error: 'Transporte no encontrado' });
        }
        res.status(200).json({ message: 'Transporte eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Transporte' });
    }
};
