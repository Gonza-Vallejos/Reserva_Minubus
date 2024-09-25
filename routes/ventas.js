const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

router.get('/', ventasController.obtenerVentas);

router.get('/:id', ventasController.obtenerVentasPorId);

router.post('/', ventasController.crearVenta);

router.put('/:id', ventasController.actualizarVentas);

router.patch('/:id', ventasController.eliminarVentas);


module.exports = router; 
