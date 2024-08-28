const express = require('express');
const router = express.Router();
const transporteController = require('../controllers/medio_transporteController');
const validateMedioTransporte = require('../middlewares/validateMedio_Transporte');

router.get('/', transporteController.getAllTransporte);
router.post('/', validateMedioTransporte ,transporteController.createTransporte);
router.delete('/:id', transporteController.deleteTransporte);

module.exports = router;