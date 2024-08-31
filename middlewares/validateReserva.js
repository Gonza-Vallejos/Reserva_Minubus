const { body, validationResult } = require('express-validator');
const { Reserva, Usuario, Viajes } = require('../models');

const validateReserva = [
  // Validar ubicación de origen
  body('ubicacion_origen')
    .notEmpty().withMessage('La ubicación de origen es requerida.')
    .isString().withMessage('La ubicación de origen debe ser un texto.'),

  // Validar ubicación de destino
  body('ubicacion_destino')
    .notEmpty().withMessage('La ubicación de destino es requerida.')
    .isString().withMessage('La ubicación de destino debe ser un texto.'),

  // Validar fecha de la reserva
  body('fecha_reserva')
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

  // Validar usuarios_id
  body('usuarios_id')
    .notEmpty().withMessage('El ID del usuario es requerido.')
    .isInt().withMessage('El ID del usuario debe ser un número entero.')
    .custom(async (usuarios_id, { req }) => {
      const usuario = await Usuario.findByPk(usuarios_id);
      if (!usuario) {
        throw new Error('El usuario especificado no existe.');
      }

      // Validar unicidad del usuario para la reserva
      const reservaExistente = await Reserva.findOne({ where: { usuarios_id, id: { $ne: req.params.id } } });
      if (reservaExistente) {
        throw new Error('Este usuario ya tiene una reserva.');
      }

      return true;
    }),

  // Validar viajes_id
  body('viajes_id')
    .notEmpty().withMessage('El ID del viaje es requerido.')
    .isInt().withMessage('El ID del viaje debe ser un número entero.')
    .custom(async (viajes_id, { req }) => {
      const viaje = await Viajes.findByPk(viajes_id);
      if (!viaje) {
        throw new Error('El viaje especificado no existe.');
      }

      // Validar unicidad del viaje para la reserva
      const reservaExistente = await Reserva.findOne({ where: { viajes_id, id: { $ne: req.params.id } } });
      if (reservaExistente) {
        throw new Error('Este viaje ya tiene una reserva.');
      }

      return true;
    }),

  // Manejo de errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];

module.exports = validateReserva;
