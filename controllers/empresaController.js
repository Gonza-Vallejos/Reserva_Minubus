// controllers/empresaController.js
const { Empresa } = require('../models');

// Obtener todas las empresas
exports.obtenerEmpresas = async (req, res) => {
    try {
        const empresas = await Empresa.findAll({
            where: { eliminado: 'no' },
            attributes: ['id','nombre', 'direccion', 'cuit','telefono', 'email','localidad_id'] 
        });
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las empresas' });
    }
};

// Obtener una Empresa por ID
exports.obtenerEmpresaId = async (req, res) => {
    try {
        const empresa = await Empresa.findAll( {
             where: { id: req.params.id },
            attributes: ['id','nombre', 'direccion', 'cuit','telefono', 'email','localidad_id'] 
        });
        
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la Empresa' });
    }
};

// Crear una nueva empresa
exports.crearEmpresa = async (req, res) => {
    try {
        const { nombre, direccion, cuit, telefono, email, localidad_id} = req.body;
        
        // Crear el usuario con los campos separados
        const nuevaEmpresa = await Empresa.create({
            nombre: nombre,
            direccion: direccion,
            cuit: cuit,
            telefono:telefono,
            email:email,
            localidad_id:localidad_id,
            
        });
        res.status(201).json({message: 'Empresa creada correctamente'});
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la empresa' });
    }
};

// Actualizar una empresa existente
exports.actualizarEmpresa = async (req, res) => {
    try {
        const camposActualizados = ['nombre', 'direccion','telefono', 'email']; 

        const [actualizarEmpresa] = await Empresa.update(req.body, {
            where: { id: req.params.id },
            fields: camposActualizados 
        });
        if (!actualizarEmpresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.status(200).json({ message: 'Empresa actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la empresa' });
    }
};

// Eliminar una empresa
exports.eliminarEmpresa = async (req, res) => {
    try {
        // Actualizar el campo 'eliminado' a 'si'
        const [eliminar] = await Empresa.update({ eliminado: 'si' }, {
            where: { id: req.params.id },
            fields: ['eliminado']
        });

        if (!eliminar) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.status(200).json({ message: 'Empresa eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la empresa' });
    }
};


exports.obtenerEmpresaPorId = async (id) => {
    try {
        const empresa = await Empresa.findByPk(id, {
            attributes: ['id','nombre', 'direccion', 'cuit','telefono', 'email','localidad_id'] 
        });
        
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        return empresa;
    } catch (error) {
        console.error("Error al obtener la Empresa:", error);
        throw error;
    }
};