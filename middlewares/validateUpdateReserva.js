const { body, validationResult } = require('express-validator');
const { Reserva, Usuario, Viajes } = require('../models');

const validarActualizarReserva = [
  // Validar ubicación de origen
  body('ubicacionOrigen')
    .notEmpty().withMessage('La ubicación de origen es requerida.')
    .isString().withMessage('La ubicación de origen debe ser un texto.'),

  // Validar ubicación de destino
  body('ubicacionDestino')
    .notEmpty().withMessage('La ubicación de destino es requerida.')
    .isString().withMessage('La ubicación de destino debe ser un texto.'),

  // Validar fecha de la reserva
  body('fechaReserva')
    .notEmpty().withMessage('La fecha de la reserva es requerida.')
    .isISO8601().withMessage('La fecha de la reserva debe tener un formato de fecha válido.')
    .custom((fecha_reserva) => {
      const fechaActual = new Date();
      const fechaReserva = new Date(fecha_reserva);

      // Verificar que la fecha de reserva no sea anterior a la fecha actual
      if (fechaReserva < fechaActual) {
        throw new Error('La fecha y hora de la reserva no pueden ser anteriores a la fecha y hora actual.');
      }
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
 
module.exports = validarActualizarReserva;
