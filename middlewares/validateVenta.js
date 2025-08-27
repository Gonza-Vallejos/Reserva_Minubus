const { body, validationResult } = require("express-validator");
const { Ventas } = require("../models");

const validarVenta = [
  body("reserva_id")
    .isInt()
    .withMessage("El identificador de reserva debe ser un número entero.")
    .notEmpty()
    .withMessage("El identificador de reserva es requerido.")
    .custom(async (reserva_id, { req }) => {
      const venta = await Ventas.findByPk(reserva_id);
      if (!venta) {
        throw new Error("la venta especificada no existe.");
      }

      // Validar unicidad del viaje para la reserva
      const ventaExistente = await Ventas.findOne({
        where: { reserva_id, id: { $ne: req.params.id } },
      });
      if (ventaExistente) {
        throw new Error("Error al generar la venta");
      }

      return true;
    }),

  // Manejar los errores de validación
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    next();
  },
];

module.exports = validarVenta;
