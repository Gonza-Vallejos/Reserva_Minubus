const { body, validationResult } = require('express-validator');
const { Ventas } = require('../models');


const validarVenta = [
  body('fecha')
    .notEmpty().withMessage('La fecha es requerida.')
    .isISO8601().withMessage('El formato de la fecha no es válido.')
    .toDate(),
  body('hora')
    .notEmpty().withMessage('La hora es requerida.')
    .isISO8601().withMessage('El formato de la hora no es válido.')
    .toDate(),
  body('totalVentas')
    .isInt({ min: 0 }).withMessage('El total de ventas debe ser un número entero positivo.')
    .notEmpty().withMessage('El total de ventas es requerido.'),
  body('viajes_id')
    .isInt().withMessage('El identificador de viaje debe ser un número entero.')
    .notEmpty().withMessage('El identificador de viaje es requerido.')
    .custom(async (value) => {
      const existeVenta = await Ventas.findOne({ where: { viajes_id: value } });
      if (!existeVenta) {
        throw new Error('El viaje no existe');
      }
      return true;
    }),
  
  // Manejar los errores de validación
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    next();
  }
];

module.exports = validarVenta;
