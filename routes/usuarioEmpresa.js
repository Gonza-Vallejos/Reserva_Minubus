const express = require('express');
const router = express.Router();
//const { asociarUsuarioEmpresa } = require('../controllers/usuarioEmpresaController');
const usuarioEmpresa = require('../controllers/usuarioEmpresaController');


const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.post('/asociar/:id', autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioMostrador','usuarioEmpresa'),usuarioEmpresa.asociarUsuarioEmpresa);

module.exports = router;