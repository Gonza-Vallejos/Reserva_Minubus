const { body, validationResult } = require('express-validator');
const { Empresa } = require('../models');

// Middleware para validar y sanitizar los datos de la empresa
const validarEmpresa = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre de la empresa es requerido.')
    .isLength({ min: 1 }).withMessage('El nombre de la empresa no puede estar vacío.')
    .custom(async (value) => {
      // Validar que el nombre sea único
      const existeEmpresa = await Empresa.findOne({ where: { nombre: value } });
      if (existeEmpresa) {
        throw new Error('El nombre de la empresa ya está en uso.');
      }
      return true;
    }),
  
  body('direccion')
    .trim()
    .notEmpty().withMessage('La dirección de la empresa es requerida.')
    .isLength({ min: 1 }).withMessage('La dirección de la empresa no puede estar vacía.')
    .custom(async (value) => {
      // Validar que la dirección sea única
      const existeEmpresa = await Empresa.findOne({ where: { direccion: value } });
      if (existeEmpresa) {
        throw new Error('La dirección de la empresa ya está en uso.');
      }
      return true;
    }),
  
  body('cuit')
    .isInt({ min: 1, max: 99999999999 }).withMessage('El CUIT debe ser un número entero de hasta 11 dígitos.')
    .notEmpty().withMessage('El CUIT es requerido.')
    .custom(async (value) => {
      // Validar que el CUIT sea único
      const existeEmpresa = await Empresa.findOne({ where: { cuit: value } });
      if (existeEmpresa) {
        throw new Error('El CUIT ya está en uso.');
      }
      return true;
    }),
  
  body('telefono')
    .isInt().withMessage('El teléfono debe ser un número entero.')
    .notEmpty().withMessage('El teléfono es requerido.')
    .custom(async (value) => {
      // Validar que el teléfono sea único
      const existeEmpresa = await Empresa.findOne({ where: { telefono: value } });
      if (existeEmpresa) {
        throw new Error('El teléfono ya está en uso.');
      }
      return true;
    }),
  
  body('email')
    .isEmail().withMessage('El formato del correo electrónico no es válido.')
    .notEmpty().withMessage('El correo electrónico es requerido.')
    .custom(async (value) => {
      // Validar que el email sea único
      const existeEmpresa = await Empresa.findOne({ where: { email: value } });
      if (existeEmpresa) {
        throw new Error('El correo electrónico ya está en uso.');
      }
      return true;
    }),

  body('localidad_id')
    .isInt().withMessage('La identificacion de localidad es requerido y debe ser un número entero.')
    .notEmpty().withMessage('El ID de localidad es requerido.'),

  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }
    next();
  }
];

module.exports = validarEmpresa;
