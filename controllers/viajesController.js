// controllers/viajesController.js
const { Viajes } = require('../models');

// Obtener todas los viajes
exports.getViajes = async (req, res) => {
    try {
        const viajes = await Viajes.findAll();
        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los viajes' });
    }
};

// Obtener una Viaje por ID
exports.getViajesById = async (req, res) => {
    try {
        const viajes = await Viajes.findByPk(req.params.id);
        if (!viajes) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el viaje' });
    }
};
// Crear una nuevo Viaje
exports.createViajes= async (req, res) => {
    try {
        const nuevoViaje = await Viajes.create(req.body);
        res.status(201).json(nuevoViaje);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el Viaje' });
    }
};

// Actualizar un viaje existente
exports.updateViajes = async (req, res) => {
    try {
        const [actualizarViaje] = await Viajes.update(req.body, {
            where: { id: req.params.id }
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
exports.deleteViajes= async (req, res) => {
    try {
        const eliminarViaje = await Viajes.destroy({
            where: { id: req.params.id }
        });
        if (!eliminarViaje) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.status(200).json({ message: 'Viaje eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el viaje' });
    }
};