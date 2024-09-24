const { body, validationResult } = require('express-validator');
const { Usuario } = require('../models');

const validarActualizarUsuario = [
  // Validar email
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
  body('contrasenia')
    .optional()
    .isLength({ min: 8, max: 12 }).withMessage('debe tener entre 8 y 12 caracteres')
    .matches(/[A-Z]/).withMessage('debe contener al menos una letra mayúscula')
    .matches(/[a-z]/).withMessage('debe contener al menos una letra minúscula')
    .matches(/[0-9]/).withMessage('debe contener al menos un número')
    .matches(/[@$!%*#_.?&]/).withMessage('debe contener al menos un carácter especial'),

    //validar el perfil 
    body('perfil_id')
    .isInt().withMessage('El perfil debe ser un número entero.')
    .notEmpty().withMessage('El perfil es requerido.')
    .custom(async (value, { req }) => {
      // Obtener el usuario actual desde la base de datos según el ID
      const usuario = await Usuario.findOne({ where: { id: req.params.id } });
      
      // Verificar el perfil actual del usuario en la base de datos
      if (usuario.perfil_id === 2) {
        throw new Error('No tienes acceso para modificar este perfil.');
      }

      // Si el perfil es 1, permitimos la validación.
      return true;
    }),



  // Manejo de errores
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }
    next();
  }
];

module.exports = validarActualizarUsuario;

  