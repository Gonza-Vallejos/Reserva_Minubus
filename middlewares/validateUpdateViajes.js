const { body, validationResult } = require("express-validator");
const { MedioTransporte } = require("../models");

// Middleware para validar y sanitizar los datos del viaje
const validarActualizarViaje = [
  body("origenLocalidad")
    .trim()
    .notEmpty()
    .withMessage("El origen es requerido."),
  body("destinoLocalidad")
    .trim()
    .notEmpty()
    .withMessage("El destino es requerido."),
  body("horarioSalida")
    .notEmpty()
    .withMessage("El horario de salida es requerido.")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("El formato de la hora debe ser HH:mm:ss"),
  body("fechaViaje")
    .notEmpty()
    .withMessage("La fecha del viaje es requerida.")
    .isISO8601()
    .withMessage("El formato de la fecha no es válido.")
    .toDate(),
  body("precio")
    .isFloat({ min: 0 })
    .withMessage("El precio debe ser un número positivo.")
    .notEmpty()
    .withMessage("El precio es requerido."),
  body("usuarioEmpresa_id")
    .isInt()
    .withMessage(
      "El identificador del medio de transporte debe ser un número entero."
    )
    .notEmpty()
    .withMessage("El nombre del chofer es requerido."),
  body("medioTransporte_id")
    .isInt()
    .withMessage(
      "El identificador del medio de transporte debe ser un número entero."
    )
    .notEmpty()
    .withMessage("El identificador del medio de transporte es requerido.")
    .custom(async (value) => {
      const existeMedioTransporte = await MedioTransporte.findOne({
        where: { id: value },
      });
      if (!existeMedioTransporte) {
        throw new Error("El medio de transporte no existe.");
      }
      return true;
    }),

  // Manejar los errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors.array());

      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = validarActualizarViaje;
