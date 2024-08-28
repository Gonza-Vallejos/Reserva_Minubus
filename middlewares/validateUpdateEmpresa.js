const { body, validationResult } = require('express-validator');
const { Empresa } = require('../models');

const validateUpdateEmpresa = [
  // Validar nombre
  body('nombre')
    .optional()
    .notEmpty().withMessage('El nombre es requerido.')
    .isString().withMessage('El nombre debe ser un string.')
    .custom(async (nombre, { req }) => {
      const empresa = await Empresa.findOne({ where: { nombre } });
      if (empresa && empresa.id !== parseInt(req.params.id)) {
        throw new Error('El nombre ya está en uso por otra empresa.');
      }
      return true;
    }),

  // Validar dirección
  body('direccion')
    .optional()
    .notEmpty().withMessage('La dirección es requerida.')
    .isString().withMessage('La dirección debe ser un string.')
    .custom(async (direccion, { req }) => {
      const empresa = await Empresa.findOne({ where: { direccion } });
      if (empresa && empresa.id !== parseInt(req.params.id)) {
        throw new Error('La dirección ya está en uso por otra empresa.');
      }
      return true;
    }),

  // Validar CUIT
  body('cuit')
    .optional()
    .isInt().withMessage('El CUIT debe ser un número entero.')
    .isLength({ min: 1, max: 11 }).withMessage('El CUIT debe tener entre 1 y 11 dígitos.')
    .custom(async (cuit, { req }) => {
      const empresa = await Empresa.findOne({ where: { cuit } });
      if (empresa && empresa.id !== parseInt(req.params.id)) {
        throw new Error('El CUIT ya está en uso por otra empresa.');
      }
      return true;
    }),

  // Validar teléfono
  body('telefono')
    .optional()
    .isInt().withMessage('El teléfono debe ser un número entero.')
    .custom(async (telefono, { req }) => {
      const empresa = await Empresa.findOne({ where: { telefono } });
      if (empresa && empresa.id !== parseInt(req.params.id)) {
        throw new Error('El teléfono ya está en uso por otra empresa.');
      }
      return true;
    }),

  // Validar email
  body('email')
    .optional()
    .isEmail().withMessage('El formato del correo electrónico no es válido.')
    .custom(async (email, { req }) => {
      const empresa = await Empresa.findOne({ where: { email } });
      if (empresa && empresa.id !== parseInt(req.params.id)) {
        throw new Error('El correo electrónico ya está en uso por otra empresa.');
      }
      return true;
    }),

  // Validar localidad_id
  body('localidad_id')
    .optional()
    .isInt().withMessage('La localidad_id debe ser un número entero.')
    .notEmpty().withMessage('La localidad_id es requerida.'),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = validateUpdateEmpresa;
