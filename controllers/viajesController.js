// controllers/viajesController.js
const { Viajes } = require('../models');

// Obtener todas los viajes
exports.obtenerViajes = async (req, res) => {
    try {
        const viajes = await Viajes.findAll();
        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los viajes' });
    }
};

// Obtener una Viaje por ID
exports.obtenerViajePorId = async (req, res) => {
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
exports.crearViaje= async (req, res) => {
    try {
        const nuevoViaje = await Viajes.create(req.body);
        res.status(201).json(nuevoViaje);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el Viaje' });
    }
};

// Actualizar un viaje existente
exports.actualizarViajes = async (req, res) => {
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
exports.eliminarViajes= async (req, res) => {
    console.log(`Solicitando eliminar viajes con ID: ${req.params.id}`);
    try {
        // Actualizar el campo 'eliminado' a 'si'
        const [eliminar] = await Viajes.update({ eliminado: 'si' }, {
            where: { id: req.params.id },
            fields: ['eliminado']
        });

        if (!eliminarViaje) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.status(200).json({ message: 'Viaje eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el viaje' });
    }
};