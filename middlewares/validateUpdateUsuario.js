const { body, validationResult } = require('express-validator');
const { Usuario } = require('../models');

const validateUpdateUsuario = [
  // Validar email
  body('dni')
    .isInt({ min: 1, max: 99999999 }).withMessage('El DNI debe ser un número entero de hasta 8 dígitos.')
    .notEmpty().withMessage('El DNI es requerido.')
    .custom(async (telefono, { req }) => {
        const usuario = await Usuario.findOne({ where: { telefono } });
        if (usuario && usuario.id !== parseInt(req.params.id)) {
          throw new Error('El teléfono ya está en uso por otro usuario');
        }
        return true;
      }),
  body('email')
    .optional()
    .isEmail().withMessage('El formato del correo electrónico no es válido')
    .custom(async (email, { req }) => {
      const usuario = await Usuario.findOne({ where: { email } });
      if (usuario && usuario.id !== parseInt(req.params.id)) {
        throw new Error('El correo electrónico ya está en uso por otro usuario');
      }
      return true;
    }),

  // Validar teléfono
  body('telefono')
    .optional()
    .isInt().withMessage('El teléfono debe ser un número entero')
    .custom(async (telefono, { req }) => {
      const usuario = await Usuario.findOne({ where: { telefono } });
      if (usuario && usuario.id !== parseInt(req.params.id)) {
        throw new Error('El teléfono ya está en uso por otro usuario');
      }
      return true;
    }),

  // Validar usuario
  body('usuario')
    .optional()
    .isLength({ min: 4 }).withMessage('El usuario debe tener al menos 4 caracteres')
    .custom(async (usuario, { req }) => {
      const usuarioExistente = await Usuario.findOne({ where: { usuario } });
      if (usuarioExistente && usuarioExistente.id !== parseInt(req.params.id)) {
        throw new Error('El nombre de usuario ya está en uso por otro usuario');
      }
      return true;
    }),

  // Validar contraseña
  body('contraseña')
    .optional()
    .isLength({ min: 8, max: 12 }).withMessage('La contraseña debe tener entre 8 y 12 caracteres')
    .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
    .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe contener al menos un número')
    .matches(/[@$!%*?&]/).withMessage('La contraseña debe contener al menos un carácter especial'),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = validateUpdateUsuario;

  