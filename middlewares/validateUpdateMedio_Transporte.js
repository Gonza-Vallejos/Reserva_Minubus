const { body, validationResult } = require('express-validator');
const { Medio_Transporte } = require('../models');

const validarActualizarTransporte = [
  // Validar nombre
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un string.')
    .custom(async (nombre, { req }) => {
      const transporte = await Medio_Transporte.findOne({ where: { nombre } });
      if (transporte && transporte.id !== parseInt(req.params.id)) {
        throw new Error('El nombre ya está en uso por otro medio de transporte');
      }
      return true;
    }),


  // Validar cantidad de lugares
  body('cantLugares')
    .notEmpty().withMessage('La cantidad de lugares es requerida.')
    .isInt({ min: 10 }).withMessage('La cantidad de lugares debe ser un número mayor a 10.'),


  // Manejo de errores
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }
    next();
  }
];

module.exports = validarActualizarTransporte;
