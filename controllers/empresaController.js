// controllers/empresaController.js
const { Empresa } = require('../models');

// Obtener todas las empresas
exports.getEmpresa = async (req, res) => {
    try {
        const empresas = await Empresa.findAll();
        res.status(200).json(empresas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las empresas' });
    }
};

// Obtener una Empresa por ID
exports.getEmpresaById = async (req, res) => {
    try {
        const empresa = await Empresa.findByPk(req.params.id);
        if (!empresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.status(200).json(empresa);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la empresa' });
    }
};

// Crear una nueva empresa
exports.createEmpresa = async (req, res) => {
    try {
        const nuevaEmpresa = await Empresa.create(req.body);
        res.status(201).json(nuevaEmpresa);
    } catch (error) {
        console.error('Error al crear la empresa:', error);
        res.status(500).json({ error: 'Error al crear la empresa' });
    }
};

// Actualizar una empresa existente
exports.updateEmpresa = async (req, res) => {
    try {
        const [actualizarEmpresa] = await Empresa.update(req.body, {
            where: { id: req.params.id }
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
exports.deleteEmpresa = async (req, res) => {
    try {
        const eliminarEmpresa = await Empresa.destroy({
            where: { id: req.params.id }
        });
        if (!eliminarEmpresa) {
            return res.status(404).json({ error: 'Empresa no encontrada' });
        }
        res.status(200).json({ message: 'Empresa eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la empresa' });
    }
};
