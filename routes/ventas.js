const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');
const validateVenta = require('../middlewares/validateVenta');

const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.get('/obtenerVentas',autenticarToken,permitirPerfiles('usuarioAdministrador'), ventasController.obtenerVentas);

router.get('/obtenerVentasId/:id', autenticarToken,permitirPerfiles('usuarioAdministrador'),ventasController.obtenerVentasPorId);

router.post('/crearVenta', autenticarToken,permitirPerfiles('usuarioAdministrador'),ventasController.crearVenta);

router.put('/actualizarVenta/:id', autenticarToken,permitirPerfiles('usuarioAdministrador'), ventasController.actualizarVentas);

router.put('/eliminarVenta/:id', autenticarToken,permitirPerfiles('usuarioAdministrador'),ventasController.eliminarVentas);

router.get('/obtenerVentaDetalle/:id', autenticarToken,permitirPerfiles('usuarioAdministrador'),ventasController.obtenerVentaDetalle);


module.exports = router; 
