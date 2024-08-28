const express = require('express');
const router = express.Router();
const empresaController = require('../controllers/empresaController');
const validateEmpresa = require('../middlewares/validateEmpresa');
const validateUpdateEmpresa = require('../middlewares/validateUpdateEmpresa');

router.get('/', empresaController.getEmpresa);
router.get('/:id', empresaController.getEmpresaById);
router.post('/', validateEmpresa, empresaController.createEmpresa);
router.put('/:id', validateUpdateEmpresa, empresaController.updateEmpresa);
router.delete('/:id', empresaController.deleteEmpresa);

module.exports = router;
