const { body, validationResult } = require('express-validator');
const { Pasajeros } = require('../models');

const validarActualizacionPasajero = [
 // Validaciones por cada campo de cada persona en el array
   body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es requerido.')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).withMessage('El nombre solo puede contener letras y espacios.'),

  body('apellido')
    .trim()
    .notEmpty().withMessage('El apellido es requerido.')
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/).withMessage('El apellido solo puede contener letras y espacios.'),


  body('dni')
    .notEmpty().withMessage('El DNI es requerido.')
    .isInt({ min: 1, max: 99999999 }).withMessage('El DNI debe tener entre 4 y 8 dígitos.')
    .custom(async (value, { req }) => {
      const pasajeroExistente = await Pasajeros.findByPk(req.params.id);
      if (!pasajeroExistente) {
        throw new Error('Pasajero no encontrado.');
      }

      const pasajeroConMismoDni = await Pasajeros.findOne({
        where: {
          dni: value,
          reserva_id: pasajeroExistente.reserva_id,
          id: { $ne: req.params.id }, // excluye al pasajero actual
          eliminado: 'no'
        }
      });

      if (pasajeroConMismoDni) {
        throw new Error('Ya hay otro pasajero con ese DNI en esta reserva.');
      }

      return true;
    }),

  body('ubicacionOrigen')
    .trim()
    .notEmpty().withMessage('La ubicación de origen es requerida.'),

  body('ubicacionDestino')
    .trim()
    .notEmpty().withMessage('La ubicación de destino es requerida.'),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  }
];

module.exports = validarActualizacionPasajero;
