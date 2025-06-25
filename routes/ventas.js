const express = require('express');
const router = express.Router();
const ventasController = require('../controllers/ventasController');
const validateVenta = require('../middlewares/validateVenta');

const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.get('/obtenerVentas',autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioEmpresa','usuarioMostrador'), ventasController.obtenerVentas);

router.get('/obtenerVentasId/:id', autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioEmpresa','usuarioMostrador'),ventasController.obtenerVentasPorId);

router.post('/crearVenta', autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioMostrador', 'usuarioCliente','usuarioChofer'),ventasController.crearVenta);

router.put('/actualizarVenta/:id', autenticarToken,permitirPerfiles('usuarioAdministrador'), ventasController.actualizarVentas);

router.put('/eliminarVenta/:id', autenticarToken,permitirPerfiles('usuarioAdministrador'),ventasController.eliminarVentas);

router.get('/obtenerVentaDetalle/:id', autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente','usuarioMostrador'),ventasController.obtenerVentaDetalle);

router.get('/obtenerVentaDetalleGeneral/:id', autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente','usuarioMostrador','usuarioChofer'),ventasController.obtenerVentaDetalleGeneral);


router.get('/existeReservaVenta/:id', autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente','usuarioMostrador','usuarioChofer'),ventasController.existeReservaVenta);




module.exports = router; 
