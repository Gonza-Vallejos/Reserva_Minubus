const { body, validationResult } = require("express-validator");

const validarDetalleReserva = [
  // Validar el nombre
  body("personas.*.nombre")
    .notEmpty()
    .withMessage("El nombre es requerido.")
    .isString()
    .withMessage("El nombre debe ser un texto."),

  // Validar el apellido
  body("personas.*.apellido")
    .notEmpty()
    .withMessage("El apellido es requerido.")
    .isString()
    .withMessage("El apellido debe ser un texto."),

  // Validar el DNI
  body("personas.*.dni")
    .notEmpty()
    .withMessage("El DNI es requerido.")
    .isNumeric()
    .withMessage("El DNI debe ser un número.")
    .isLength({ min: 7, max: 10 })
    .withMessage("El DNI debe tener entre 7 y 8 dígitos."),

  // Validar la ubicación de origen
  body("personas.*.ubicacionOrigen")
    .notEmpty()
    .withMessage("La ubicación de origen es requerida.")
    .isString()
    .withMessage("La ubicación de origen debe ser un texto."),

  // Validar la ubicación de destino
  body("personas.*.ubicacionDestino")
    .notEmpty()
    .withMessage("La ubicación de destino es requerida.")
    .isString()
    .withMessage("La ubicación de destino debe ser un texto."),

  // Manejo de errores
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }
    next();
  },
];

module.exports = validarDetalleReserva;
