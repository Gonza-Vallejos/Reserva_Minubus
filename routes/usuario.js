const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const validateUsuario = require('../middlewares/validateUsuario');
const validateUpdateUsuario = require('../middlewares/validateUpdateUsuario');


// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getAllUsuarios);

// Ruta para obtener un usuario por ID 
router.get('/:id', usuarioController.getUsuarioById);

// Ruta para crear un nuevo usuario
router.post('/', validateUsuario, usuarioController.createUsuario);

// Ruta para actualizar un usuario existente
router.put('/:id', validateUpdateUsuario, usuarioController.updateUsuario);

// Ruta para eliminar un usuario
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
