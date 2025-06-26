const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const {decodeJWT, decodificar} = require('../decripJWT/decodificarJWT')
const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.post('/login', authController.login);
router.get('/decodificar', autenticarToken,permitirPerfiles('usuarioAdministrador'),decodificar);
// Verificación
router.get('/verificar/:token', authController.verificarEmail);



router.post('/verificar-final/:token', authController.verificarFinal);


module.exports = router;


