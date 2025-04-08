const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');
const validateVenta = require('../middlewares/validateVenta');

router.get('/obtenerVentas', ventasController.obtenerVentas);

router.get('/obtenerVentasId/:id', ventasController.obtenerVentasPorId);

router.post('/crearVenta',ventasController.crearVenta);

router.put('/actualizarVenta/:id', ventasController.actualizarVentas);

router.put('/eliminarVenta/:id', ventasController.eliminarVentas);

router.get('/obtenerVentaDetalle/:id', ventasController.obtenerVentaDetalle);


module.exports = router; 
