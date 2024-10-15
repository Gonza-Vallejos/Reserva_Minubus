// controllers/viajesController.js
const { Viajes } = require('../models');

// Obtener todas los viajes
exports.obtenerViajes = async (req, res) => {
    try {
        const viajes = await Viajes.findAll({
            attributes:['id','origenLocalidad','destinoLocalidad','orarioSalida','fechaViaje','precio','chofer','medioTransporte_id']
        });
        res.status(200).json(viajes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los viajes' });
    }
};

// Obtener una Viaje por ID
exports.obtenerViajePorId = async (req, res) => {
    try {
        const viajes = await Viajes.findByPk(req.params.id, {
            attributes:['id','origenLocalidad','destinoLocalidad','orarioSalida','fechaViaje','precio','chofer','medioTransporte_id']
        });
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
        const { origenLocalidad, destinoLocalidad, horarioSalida, fechaViaje, precio, chofer, medioTransporte_id } = req.body;
        
        // Crear el usuario con los campos separados
        const nuevoViaje= await Viajes.create({
            origenLocalidad: origenLocalidad,
            destinoLocalidad: destinoLocalidad,
            horarioSalida: horarioSalida,
            fechaViaje:fechaViaje,
            precio:precio,
            chofer:chofer,
            medioTransporte_id:medioTransporte_id,
           
        });
        res.status(201).json({ message: 'viaje creado' });
    } catch (error) {
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

        if (!eliminarViaje) {
            return res.status(404).json({ error: 'Viaje no encontrado' });
        }
        res.status(200).json({ message: 'Viaje eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el viaje' });
    }
};