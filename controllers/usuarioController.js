const { Usuario } = require('../models');

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id);
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            // Captura errores de validación como un formato de correo inválido
            const mensajesDeError = error.errors.map(e => e.message);
            res.status(400).json({ error: mensajesDeError });
        } else if (error.name === 'SequelizeUniqueConstraintError') {
            // Captura errores de unicidad, como un correo ya registrado
            res.status(400).json({ error: 'El correo electrónico o el nombre de usuario ya están en uso.' });
        } else {
            // Captura otros tipos de errores
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    }
};

// Actualizar un usuario existente
exports.updateUsuario = async (req, res) => {
    try {
        const [actualizar] = await Usuario.update(req.body, {
            where: { id: req.params.id }
        });
        if (!actualizar) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
    try {
        const eliminar = await Usuario.destroy({
            where: { id: req.params.id }
        });
        if (!eliminar) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};
