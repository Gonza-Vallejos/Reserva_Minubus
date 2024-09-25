const { body, validationResult } = require('express-validator');
const { Usuario } = require('../models');


// Middleware para validar y sanitizar los datos del usuario
const validarUsuario = [
  body('nombre')
    .trim() 
    .notEmpty().withMessage('El nombre es requerido.'),
  body('apellido')
    .trim()
    .notEmpty().withMessage('El apellido es requerido.'),
  body('dni')
    .isInt({ min: 1, max: 99999999 }).withMessage('El DNI debe tener entre 4 y 8 digitos.')
    .notEmpty().withMessage('El DNI es requerido.')
    .custom(async (value) => {
      const existeUsuario = await Usuario.findOne({ where: { dni: value } });
      if (existeUsuario) {
        throw new Error('El dni ya está en uso.');
      }
      return true;
    }),
  body('telefono')
    .isInt().withMessage('El teléfono debe ser un número entero.')
    .notEmpty().withMessage('El teléfono es requerido.')
    .custom(async (value) => {
      const existeUsuario = await Usuario.findOne({ where: { telefono: value } });
      if (existeUsuario) {
        throw new Error('El teléfono ya está en uso.');
      }
      return true;
    }),
  body('email')
    .isEmail().withMessage('El formato del correo electrónico no es válido.')
    .notEmpty().withMessage('El correo electrónico es requerido.')
    .custom(async (value) => {
      const existeUsuario = await Usuario.findOne({ where: { email: value } });
      if (existeUsuario) {
        throw new Error('El correo electrónico ya está en uso.');
      }
      return true;
    }),
  body('usuario')
    .isLength({ min: 4 }).withMessage('El usuario debe tener al menos 4 caracteres.')
    .notEmpty().withMessage('El usuario es requerido.')
    .custom(async (value) => {
      const existeUsuario = await Usuario.findOne({ where: { usuario: value } });
      if (existeUsuario) {
        throw new Error('El nombre de usuario ya está en uso.');
      }
      return true;
    }),
    body('contrasenia')
    .optional()
    .isLength({ min: 8, max: 12 }).withMessage('debe tener entre 8 y 12 caracteres')
    .matches(/[A-Z]/).withMessage('debe contener al menos una letra mayúscula')
    .matches(/[a-z]/).withMessage('debe contener al menos una letra minúscula')
    .matches(/[0-9]/).withMessage('debe contener al menos un número')
    .matches(/[@$!%*?#_.&]/).withMessage('debe contener al menos un carácter especial'),
  body('perfil_id')
    .isInt().withMessage('El perfil es requerido.')
    .notEmpty().withMessage('El perfil es requerido.'),
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    next();
  }

];



module.exports = validarUsuario;



