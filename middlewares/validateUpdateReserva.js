const { body, validationResult } = require('express-validator');


const validarActualizarReserva = [
  // Validar ubicación de origen
  body('ubicacionOrigen')
    .notEmpty().withMessage('La ubicación de origen es requerida.')
    .isString().withMessage('La ubicación de origen debe ser un texto.'),

  // Validar ubicación de destino
  body('ubicacionDestino')
    .notEmpty().withMessage('La ubicación de destino es requerida.')
    .isString().withMessage('La ubicación de destino debe ser un texto.'),


  // Manejo de errores
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }
    next();
  }
];
 
module.exports = validarActualizarReserva;
