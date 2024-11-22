const { body, validationResult } = require('express-validator');
const { DetalleReserva } = require('../models');

const validarDetalleReserva = [
  // Validar el nombre
  body('personas.*.nombre')
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un texto.'),

  // Validar la ubicación de origen
  body('personas.*.ubicacionOrigen')
    .notEmpty().withMessage('La ubicación de origen es requerida.')
    .isString().withMessage('La ubicación de origen debe ser un texto.'),

  // Validar la ubicación de destino
  body('personas.*.ubicacionDestino')
    .notEmpty().withMessage('La ubicación de destino es requerida.')
    .isString().withMessage('La ubicación de destino debe ser un texto.'),

  // Manejo de errores
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }
    next();
  }
];

module.exports = validarDetalleReserva;

