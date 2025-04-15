const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const validateEmpresa = require('../middlewares/validateEmpresa');
const validateUpdateEmpresa = require('../middlewares/validateUpdateEmpresa');

const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.get('/obtenerEmpresa',autenticarToken,permitirPerfiles('usuarioAdministrador'), empresaController.obtenerEmpresas);

router.get('/obtenerEmpresaId',autenticarToken,permitirPerfiles('usuarioAdministrador'), empresaController.obtenerEmpresaPorId);

router.post('/crearEmpresa',autenticarToken,permitirPerfiles('usuarioAdministrador'), validateEmpresa, empresaController.crearEmpresa);

router.put('/actualizarEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), validateUpdateEmpresa, empresaController.actualizarEmpresa);

router.put('/eliminarEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador'), empresaController.eliminarEmpresa);

module.exports = router;
