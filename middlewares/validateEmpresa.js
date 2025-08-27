const { body, validationResult } = require("express-validator");
const { Empresa } = require("../models");

const validarEmpresa = [
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la empresa es requerido.")
    .isLength({ min: 1 })
    .withMessage("El nombre de la empresa no puede estar vacío.")
    .custom(async (value) => {
      const existeEmpresa = await Empresa.findOne({ where: { nombre: value } });
      if (existeEmpresa) {
        throw new Error("El nombre de la empresa ya está en uso.");
      }
      return true;
    }),

  body("direccion")
    .trim()
    .notEmpty()
    .withMessage("La dirección de la empresa es requerida.")
    .isLength({ min: 1 })
    .withMessage("La dirección de la empresa no puede estar vacía.")
    .custom(async (value) => {
      const existeEmpresa = await Empresa.findOne({
        where: { direccion: value },
      });
      if (existeEmpresa) {
        throw new Error("La dirección de la empresa ya está en uso.");
      }
      return true;
    }),

  body("cuit")
    .isNumeric()
    .withMessage("El CUIT  debe contener solo números.")
    .isInt({ min: 1, max: 99999999999 })
    .withMessage("El CUIT debe ser un número entero de hasta 11 dígitos.")
    .notEmpty()
    .withMessage("El CUIT es requerido.")
    .custom(async (value) => {
      const existeEmpresa = await Empresa.findOne({ where: { cuit: value } });
      if (existeEmpresa) {
        throw new Error("El CUIT ya está en uso.");
      }
      return true;
    }),

  body("telefono")
    .notEmpty()
    .withMessage("El teléfono es requerido.")
    .isNumeric()
    .withMessage("El teléfono debe contener solo números.")
    .isLength({ min: 10, max: 13 })
    .withMessage("El teléfono debe tener entre 10 y 13 dígitos.")
    .isInt()
    .withMessage("El teléfono debe ser un número entero.")
    .notEmpty()
    .withMessage("El teléfono es requerido.")
    .custom(async (value) => {
      const existeEmpresa = await Empresa.findOne({
        where: { telefono: value },
      });
      if (existeEmpresa) {
        throw new Error("El teléfono ya está en uso.");
      }
      return true;
    }),

  body("email")
    .isEmail()
    .withMessage("El formato del correo electrónico no es válido.")
    .notEmpty()
    .withMessage("El correo electrónico es requerido.")
    .custom(async (value) => {
      const existeEmpresa = await Empresa.findOne({ where: { email: value } });
      if (existeEmpresa) {
        throw new Error("El correo electrónico ya está en uso.");
      }
      return true;
    }),

  body("localidad_id")
    .isInt()
    .withMessage(
      "La identificación de localidad es requerida y debe ser un número entero."
    )
    .notEmpty()
    .withMessage("El ID de localidad es requerido."),

  (req, res, next) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];

module.exports = validarEmpresa;
