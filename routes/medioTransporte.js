const express = require('express');
const router = express.Router();
const transporteController = require('../controllers/medio_transporteController');
const validateMedioTransporte = require('../middlewares/validateMedio_Transporte');
const validateUpdateTransporte= require('../middlewares/validateUpdateMedio_Transporte');

const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.get('/obtenerTransporte',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa','usuarioMostrador'), transporteController.obtenerTransportes);

router.get('/obtenerTransportePorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa','usuarioMostrador'), transporteController.obtenerTransportesPorEmpresa);

router.post('/crearTransporte',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), validateMedioTransporte ,transporteController.crearTransporte);


router.get('/obtenerTransporteId/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa', 'usuarioMostrador'),transporteController.obtenerTransportePorId);

router.put('/actualizarTransporte/:id', autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'),validateUpdateTransporte ,transporteController.actualizarTransporte);

router.put('/eliminarTransporte/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), transporteController.eliminarTransporte);

router.get('/obtenerViajesPorTransporte/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), transporteController.obtenerViajesPorTransporte);


router.get('/verificarTransporteSinReservas/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), transporteController.verificarTransporteSinReservas);

module.exports = router;