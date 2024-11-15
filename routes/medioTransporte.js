const express = require('express');
const router = express.Router();
const transporteController = require('../controllers/medio_transporteController');
const validateMedioTransporte = require('../middlewares/validateMedio_Transporte');
const validateUpdateTransporte= require('../middlewares/validateUpdateMedio_Transporte');

router.get('/obtenerTransporte', transporteController.obtenerTransportes);

router.post('/crearTransporte', validateMedioTransporte ,transporteController.crearTransporte);

router.put('/eliminarTransporte/:id', transporteController.eliminarTransporte);

router.get('/obtenerTransporteId',transporteController.obtenerTransportePorId);

router.put('/actualizarTransporte/:id', validateUpdateTransporte ,transporteController.actualizarTransporte);
module.exports = router;