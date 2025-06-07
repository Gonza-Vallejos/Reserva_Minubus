const express = require('express');
const router = express.Router();
const usuarioEmpresa = require('../controllers/usuarioEmpresaController');


const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.post('/asociar/:id/:empresaId', autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioMostrador','usuarioEmpresa'),usuarioEmpresa.asociarUsuarioEmpresa);

router.get('/empresaUsuario/:id',autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioMostrador','usuarioEmpresa'), usuarioEmpresa.obtenerEmpresaDeUsuario);

router.delete('/desasociar/:id',autenticarToken,permitirPerfiles('usuarioAdministrador'),usuarioEmpresa.desasociarUsuarioEmpresa);

router.get('/obtenerUsuariosPorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioMostrador','usuarioEmpresa'), usuarioEmpresa.obtenerUsuariosPorEmpresa);
module.exports = router;