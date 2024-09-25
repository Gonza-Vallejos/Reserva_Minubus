const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const validateEmpresa = require('../middlewares/validateEmpresa');
const validateUpdateEmpresa = require('../middlewares/validateUpdateEmpresa');

router.get('/', empresaController.obtenerEmpresas);

router.get('/:id', empresaController.obtenerEmpresaPorId);

router.post('/', validateEmpresa, empresaController.crearEmpresa);

router.put('/:id', validateUpdateEmpresa, empresaController.actualizarEmpresa);

router.patch('/:id', empresaController.eliminarEmpresa);

module.exports = router;
