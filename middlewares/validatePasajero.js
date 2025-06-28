const { body, validationResult } = require('express-validator');
const { Pasajeros } = require('../models');

const validarPasajero = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido.'),

  body('apellido')
    .trim()
    .notEmpty().withMessage('El apellido es requerido.'),

  body('dni')
    .notEmpty().withMessage('El DNI es requerido.')
    .isInt({ min: 1, max: 99999999 }).withMessage('El DNI debe tener entre 4 y 8 dígitos.')
    .custom(async (value, { req }) => {
      const existeDni = await Pasajeros.findOne({
        where: {
          dni: value,
          reserva_id: req.body.reserva_id,
          eliminado: 'no'
        }
      });
      if (existeDni) {
        throw new Error('Ya hay un pasajero con ese DNI en esta reserva.');
      }
      return true;
    }),

  body('ubicacionOrigen')
    .trim()
    .notEmpty().withMessage('La ubicación de origen es requerida.'),

  body('ubicacionDestino')
    .trim()
    .notEmpty().withMessage('La ubicación de destino es requerida.'),

  

  // Validación final
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

module.exports = validarPasajero;
