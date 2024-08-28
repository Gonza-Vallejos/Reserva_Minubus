const { body, validationResult } = require('express-validator');
const { Usuario } = require('../models');


// Middleware para validar y sanitizar los datos del usuario
const validateUsuario = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido.'),
  body('apellido')
    .trim()
    .notEmpty().withMessage('El apellido es requerido.'),
  body('dni')
    .isInt({ min: 1, max: 99999999 }).withMessage('El DNI debe ser un número entero de hasta 8 dígitos.')
    .notEmpty().withMessage('El DNI es requerido.')
    .custom(async (value) => {
      const existingUser = await Usuario.findOne({ where: { dni: value } });
      if (existingUser) {
        throw new Error('El dni ya está en uso.');
      }
      return true;
    }),
  body('telefono')
    .isInt().withMessage('El teléfono debe ser un número entero.')
    .notEmpty().withMessage('El teléfono es requerido.')
    .custom(async (value) => {
      const existingUser = await Usuario.findOne({ where: { telefono: value } });
      if (existingUser) {
        throw new Error('El teléfono ya está en uso.');
      }
      return true;
    }),
  body('email')
    .isEmail().withMessage('El formato del correo electrónico no es válido.')
    .notEmpty().withMessage('El correo electrónico es requerido.')
    .custom(async (value) => {
      const existingUser = await Usuario.findOne({ where: { email: value } });
      if (existingUser) {
        throw new Error('El correo electrónico ya está en uso.');
      }
      return true;
    }),
  body('usuario')
    .isLength({ min: 4 }).withMessage('El usuario debe tener al menos 4 caracteres.')
    .notEmpty().withMessage('El usuario es requerido.')
    .custom(async (value) => {
      const existingUser = await Usuario.findOne({ where: { usuario: value } });
      if (existingUser) {
        throw new Error('El nombre de usuario ya está en uso.');
      }
      return true;
    }),
  body('contraseña')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,12}$/)
    .withMessage('La contraseña debe tener entre 8 y 12 caracteres, incluyendo mayúsculas, minúsculas, números y caracteres especiales.')
    .notEmpty().withMessage('La contraseña es requerida.'),
  body('perfil_id')
    .isInt().withMessage('El perfil es requerido y debe ser un número entero.')
    .notEmpty().withMessage('El perfil es requerido.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }

];



module.exports = validateUsuario;



