const { body, validationResult } = require('express-validator');


const validarActualizarContraseña = [
  
  // Validar contraseña
  body('contrasenia')
    .optional()
    .isLength({ min: 8, max: 12 }).withMessage('debe tener entre 8 y 12 caracteres')
    .matches(/[A-Z]/).withMessage('debe contener al menos una letra mayúscula')
    .matches(/[a-z]/).withMessage('debe contener al menos una letra minúscula')
    .matches(/[0-9]/).withMessage('debe contener al menos un número')
    .matches(/[@$!%*#_.?&]/).withMessage('debe contener al menos un carácter especial'),




  // Manejo de errores
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    next();
  }
];

module.exports = validarActualizarContraseña;

  