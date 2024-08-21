// controllers/reservaController.js
const { Reserva } = require('../models');

// Obtener todas las reservas
exports.getAllReservas = async (req, res) => {
    try {
        const reservas = await Reserva.findAll();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las reservas' });
    }
};

// Obtener una reserva por ID
exports.getReservaById = async (req, res) => {
    try {
        const reserva = await Reservas.findByPk(req.params.id);
        if (!reserva) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json(reserva);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la reserva' });
    }
};

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
    try {
      const nuevoReserva = await Reserva.create(req.body);
      res.status(201).json(nuevoReserva);
    } catch (error) {
        // Captura otros tipos de errores
        res.status(500).json({ error: 'Error al crear la reserva' });
      }
    };

// Actualizar una reserva existente
exports.updateReserva = async (req, res) => {
    try {
        const [actualizar] = await Reserva.update(req.body, {
            where: { id: req.params.id }
        });
        if (!actualizar) {
            return res.status(404).json({ error: 'Reserva no encontrado' });
        }
        res.status(200).json({ message: 'Reserva actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la reserva' });
    }
};

// Eliminar una reserva
exports.deleteReserva = async (req, res) => {
    try {
        const eliminar = await Reserva.destroy({
            where: { id: req.params.id }
        });
        if (!eliminar) {
            return res.status(404).json({ error: 'Reserva no encontrada' });
        }
        res.status(200).json({ message: 'Reserva eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la Reserva' });
    }
};
