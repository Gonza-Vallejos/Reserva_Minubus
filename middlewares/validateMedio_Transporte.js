const { body, validationResult } = require('express-validator');
const { Medio_Transporte } = require('../models');

const validateMedioTransporte = [
  // Validar nombre
  body('nombre')
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un string.')
    .custom(async (nombre, { req }) => {
      const medio = await Medio_Transporte.findOne({ where: { nombre } });
      if (medio && medio.id !== parseInt(req.params.id)) {
        throw new Error('El nombre ya está en uso por otro medio de transporte');
      }
      return true;
    }),

  // Validar patente
  body('patente')
    .notEmpty().withMessage('La patente es requerida.')
    .isString().withMessage('La patente debe ser un string.')
    .matches(/^[A-Z]{2}\d{3}[A-Z]{2}$/).withMessage('El formato de la patente debe ser de dos letras, tres números y dos letras.')
    .custom(async (patente, { req }) => {
      const medio = await Medio_Transporte.findOne({ where: { patente } });
      if (medio && medio.id !== parseInt(req.params.id)) {
        throw new Error('La patente ya está en uso por otro medio de transporte');
      }
      return true;
    }),

  // Validar marca
  body('marca')
    .notEmpty().withMessage('La marca es requerida.')
    .isString().withMessage('La marca debe ser un string.'),

  // Validar cantidad de lugares
  body('cant_lugares')
    .notEmpty().withMessage('La cantidad de lugares es requerida.')
    .isInt({ min: 10 }).withMessage('La cantidad de lugares debe ser un número mayor a 10.'),

  // Validar empresa_id
  body('empresa_id')
    .notEmpty().withMessage('El ID de la empresa es requerido.')
    .isInt().withMessage('El ID de la empresa debe ser un número entero.'),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = validateMedioTransporte;
