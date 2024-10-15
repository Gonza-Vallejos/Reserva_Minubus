const { body, validationResult } = require('express-validator');
const { MedioTransporte } = require('../models');

const validarMedioTransporte = [
  // Validar nombre
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un string.')
    .custom(async (nombre, { req }) => {
      const transporte = await MedioTransporte.findOne({ where: { nombre } });
      if (transporte && transporte.id !== parseInt(req.params.id)) {
        throw new Error('El nombre ya está en uso por otro medio de transporte');
      }
      return true;
    }),

  // Validar patente
  body('patente')
    .notEmpty().withMessage('La patente es requerida.')
    .isString().withMessage('La patente debe ser un string.')
    .matches(/^[A-Z]{2}\d{3}[A-Z]{2}$/).withMessage('El formato de la patente debe ser de dos letras, tres números y dos letras en mayúsculas.')
    .custom(async (patente, { req }) => {
      const transporte = await MedioTransporte.findOne({ where: { patente } });
      if (transporte && transporte.id !== parseInt(req.params.id)) {
        throw new Error('La patente ya está en uso por otro medio de transporte');
      }
      return true;
    }),

  // Validar marca
  body('marca')
    .notEmpty().withMessage('La marca es requerida.')
    .isString().withMessage('La marca debe ser un string.'),

  // Validar cantidad de lugares
  body('cantLugares')
    .notEmpty().withMessage('La cantidad de lugares es requerida.')
    .isInt({ min: 10 }).withMessage('La cantidad de lugares debe ser un número mayor a 10.'),

  // Validar empresa_id
  body('empresa_id')
    .notEmpty().withMessage('El ID de la empresa es requerido.')
    .isInt().withMessage('El ID de la empresa debe ser un número entero.'),

  // Manejo de errores
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }
    next();
  }
];

module.exports = validarMedioTransporte;
