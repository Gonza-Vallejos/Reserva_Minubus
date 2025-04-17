const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validateUsuario = require('../middlewares/validateUsuario');
const validateUpdateUsuario = require('../middlewares/validateUpdateUsuario');
const perfilController = require('../controllers/perfilesController');

const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

// Ruta para obtener todos los usuarios
router.get('/obtenerUsuario',autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioMostrador','usuarioEmpresa'), usuarioController.obtenerUsuarios);

// Ruta para obtener un usuario por ID 
router.get('/obtenerUsuarioId',autenticarToken,permitirPerfiles('usuarioAdministrador','usuarioMostrador','usuarioEmpresa'), usuarioController.obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post('/crearUsuario',autenticarToken,permitirPerfiles('usuarioAdministrador'), validateUsuario, usuarioController.crearUsuario);

// Ruta para actualizar un usuario existente
router.put('actualizarUsuario/:id',autenticarToken,permitirPerfiles('usuarioAdministrador'), validateUpdateUsuario, usuarioController.actualizarUsuario);


// Ruta para eliminar un usuario lógicamente
router.put('eliminarUsuario/:id',autenticarToken,permitirPerfiles('usuarioAdministrador'), usuarioController.eliminarUsuario);

router.post('/crearPerfil',autenticarToken,permitirPerfiles('usuarioAdministrador'),  perfilController.crearPerfil);


module.exports = router;
