const express = require('express');
const router = express.Router();
const transporteController = require('../controllers/medio_transporteController');
const validateMedioTransporte = require('../middlewares/validateMedio_Transporte');
const validateUpdateTransporte= require('../middlewares/validateUpdateMedio_Transporte');

router.get('/', transporteController.obtenerTransportes);

router.post('/', validateMedioTransporte ,transporteController.crearTransporte);

router.patch('/:id', transporteController.eliminarTransporte);

router.get('/:id',transporteController.obtenerTransportePorId);

router.put('/:id', validateUpdateTransporte ,transporteController.actualizarTransporte);
module.exports = router;