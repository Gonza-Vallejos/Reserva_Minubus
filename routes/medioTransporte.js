const express = require('express');
const router = express.Router();
const transporteController = require('../controllers/medio_transporteController');
const validateMedioTransporte = require('../middlewares/validateMedio_Transporte');

router.get('/', transporteController.obtenerTransportes);
router.post('/', validateMedioTransporte ,transporteController.crearTransporte);
router.delete('/:id', transporteController.eliminarTransporte);

module.exports = router;