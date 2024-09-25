const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validateUsuario = require('../middlewares/validateUsuario');
const validateUpdateUsuario = require('../middlewares/validateUpdateUsuario');


// Ruta para obtener todos los usuarios
router.get('/', usuarioController.obtenerUsuarios);

// Ruta para obtener un usuario por ID 
router.get('/:id', usuarioController.obtenerUsuarioPorId);

// Ruta para crear un nuevo usuario
router.post('/', validateUsuario, usuarioController.crearUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', validateUpdateUsuario, usuarioController.actualizarUsuario);


// Ruta para eliminar un usuario lógicamente
router.patch('/:id', usuarioController.eliminarUsuario);



module.exports = router;
