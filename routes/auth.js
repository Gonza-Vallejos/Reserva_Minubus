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

router.post('/recuperar', authController.solicitarRecuperacion);

router.post('/resetear/:token', authController.resetearContrasenia);

// Redirección según plataforma (web o mobile)
router.get('/resetear/:token', authController.redirigirReset);



// Landing que intenta abrir la app y hace fallback
router.get('/abrir-app/:token', authController.abrirApp);

// Form web para restablecer contraseña (fallback)
router.get('/resetear-web/:token', authController.formResetWeb);

// opcional: si querías mantener redirigirReset, podés commentarla o eliminarla
// router.get('/resetear/:token', authController.redirigirReset);





module.exports = router;


