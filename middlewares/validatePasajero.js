const { body, validationResult } = require("express-validator");
const { Pasajeros } = require("../models");

const validarPasajeros = [
  // Validamos que personas sea un array no vacío
  body("personas")
    .isArray({ min: 1 })
    .withMessage("Debe enviar al menos una persona."),

  // Validaciones por cada campo de cada persona en el array
  body("personas.*.nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre es requerido.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El nombre solo puede contener letras y espacios."),

  body("personas.*.apellido")
    .trim()
    .notEmpty()
    .withMessage("El apellido es requerido.")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/)
    .withMessage("El apellido solo puede contener letras y espacios."),

  body("personas.*.dni")
    .notEmpty()
    .withMessage("El DNI es requerido.")
    .isInt({ min: 1, max: 99999999 })
    .withMessage("El DNI debe tener entre 4 y 8 dígitos."),

  body("personas.*.ubicacionOrigen")
    .trim()
    .notEmpty()
    .withMessage("La ubicación de origen es requerida."),

  body("personas.*.ubicacionDestino")
    .trim()
    .notEmpty()
    .withMessage("La ubicación de destino es requerida."),

  // Validación personalizada para DNI duplicado en el array
  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }

    const dnis = new Set();
    for (const persona of req.body.personas) {
      if (dnis.has(persona.dni)) {
        return res.status(400).json({
          errores: [
            { msg: `El DNI ${persona.dni} está duplicado en los pasajeros.` },
          ],
          // errores: [{ msg: `El DNI ${persona.dni} está duplicado en los pasajeros.`, path: `personas[${index}].dni` }],
        });
      }
      dnis.add(persona.dni);
    }

    next();
  },
];

module.exports = validarPasajeros;
