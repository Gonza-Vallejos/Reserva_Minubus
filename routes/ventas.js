const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.getVentas);
router.get('/:id', ventasController.getVentasById);
router.post('/', ventasController.createVentas);
router.put('/:id', ventasController.updateVentas);
router.delete('/:id', ventasController.deleteVentas);

module.exports = router; 
