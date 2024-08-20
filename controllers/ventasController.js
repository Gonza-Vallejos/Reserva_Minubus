// controllers/ventasController.js
const { Ventas } = require('../models');

// Obtener todas las ventas
exports.getVentas = async (req, res) => {
    try {
        const ventas = await Ventas.findAll();
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};

// Obtener una Venta por ID
exports.getVentasById = async (req, res) => {
    try {
        const ventas = await Ventas.findByPk(req.params.id);
        if (!ventas) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
};
// Crear una nueva Venta
exports.createVentas= async (req, res) => {
    try {
        const nuevaVenta = await Ventas.create(req.body);
        res.status(201).json(nuevaVenta);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la venta' });
    }
};

// Actualizar una venta existente
exports.updateVentas = async (req, res) => {
    try {
        const [actualizarVenta] = await Ventas.update(req.body, {
            where: { id: req.params.id }
        });
        if (!actualizarVenta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json({ message: 'Venta actualizada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la venta' });
    }
};

// Eliminar una ventas
exports.deleteVentas= async (req, res) => {
    try {
        const eliminarVenta = await Empresa.destroy({
            where: { id: req.params.id }
        });
        if (!eliminarVenta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json({ message: 'Venta eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
};