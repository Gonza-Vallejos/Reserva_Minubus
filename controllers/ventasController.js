// controllers/ventasController.js
const { Ventas } = require('../models');

// Obtener todas las ventas
exports.obtenerVentas = async (req, res) => {
    try {
        const ventas = await Ventas.findAll({
            attributes:['id','fecha','hora','totalVentas','viajes_id']
        });
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las ventas' });
    }
};

// Obtener una Venta por ID
exports.obtenerVentasPorId = async (req, res) => {
    try {
        const ventas = await Ventas.findByPk(req.params.id, {
            attributes:['id','fecha','hora','totalVentas','viajes_id']
        });
        if (!ventas) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la venta' });
    }
};
// Crear una nueva Venta
exports.crearVenta= async (req, res) => {
    try {
        const nuevaVenta = await Ventas.create(req.body);
        res.status(200).json({ message: 'Venta creada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la venta' });
    }
};

// Actualizar una venta existente
exports.actualizarVentas = async (req, res) => {
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

// Eliminar una venta
exports.eliminarVentas= async (req, res) => {
    console.log(`Solicitando eliminar venta con ID: ${req.params.id}`);
    try {
        // Actualizar el campo 'eliminado' a 'si'
        const [eliminar] = await Ventas.update({ eliminado: 'si' }, {
            where: { id: req.params.id },
            fields: ['eliminado']
        });

        if (!eliminarVenta) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.status(200).json({ message: 'Venta eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la venta' });
    }
};