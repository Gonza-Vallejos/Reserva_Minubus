// controllers/medio_trasporteController.js
const { Medio_Transporte } = require('../models');

// Obtener todos los usuarios
exports.obtenerTransportes = async (req, res) => {
    try {
        const transportes = await Medio_Transporte.findAll();
        res.status(200).json(transportes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los transportes' });
    }
};



// Crear un nuevo transporte
exports.crearTransporte = async (req, res) => {
    try {
      const nuevoTransporte = await MedioTransporte.create(req.body);
      res.status(201).json(nuevoTransporte);
    } catch (error) {
      
        res.status(500).json({ error: 'Error al crear el transporte' });
      }
    };



// Eliminar un transporte
exports.eliminarTransporte = async (req, res) => {
    try {
        const eliminar = await Medio_Transporte.destroy({
            where: { id: req.params.id }
        });
        if (!eliminar) {
            return res.status(404).json({ error: 'Transporte no encontrado' });
        }
        res.status(200).json({ message: 'Transporte eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el Transporte' });
    }
};
