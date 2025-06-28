const { body, validationResult } = require('express-validator');
const { MedioTransporte } = require('../models');

const validarActualizarTransporte = [
  // Validar nombre
body('nombre')
  .notEmpty().withMessage('El nombre es requerido.')
  .isString().withMessage('El nombre debe ser un string.')
  .custom(async (nombre, { req }) => {
    const empresaId = req.body.empresa_id;

    if (!empresaId) {
      throw new Error('El ID de la empresa es requerido.');
    }

    const transporte = await MedioTransporte.findOne({
      where: {
        nombre,
        empresa_id: empresaId
      }
    });

    // Verifica si el nombre ya existe en esa empresa y no es el mismo que estás editando
    if (transporte && transporte.id !== parseInt(req.params.id)) {
      throw new Error('Ya existe un transporte con ese nombre en la misma empresa.');
    }

    return true;
  }),



  // Validar cantidad de lugares
  body('cantLugares')
    .notEmpty().withMessage('La cantidad de lugares es requerida.')
    .isInt({ min: 10 }).withMessage('La cantidad de lugares debe ser un número mayor a 10.'),


  // Manejo de errores
  (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errores: error.array() });
    }
    next();
  }
];

module.exports = validarActualizarTransporte;
