const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');

const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

//router.get('/obtenerDetalleVenta', ventasController.obtenerVentas);

//router.get('/obtenerDetalleVentaId', ventasController.obtenerDetalleVentaPorId);

router.post('/crearDetalleVenta', autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente'),ventasController.crearDetalleVenta);

//router.put('/actualizarDetalleVenta/:id', ventasController.actualizarDetalleVenta);

//router.put('/eliminarDetalleVenta/:id', ventasController.eliminarDetalleVenta);


module.exports = router; 
