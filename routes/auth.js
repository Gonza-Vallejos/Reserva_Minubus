const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const {decodeJWT, decodificar} = require('../decripJWT/decodificarJWT')
const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.post('/login', login);
router.get('/decodificar', autenticarToken,permitirPerfiles('usuarioAdministrador'),decodificar);
module.exports = router;
