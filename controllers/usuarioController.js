const { Usuario } = require('../models');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            // Solo los campos que quieras traer
            attributes: ['id','nombre', 'apellido', 'dni','telefono', 'email','usuario','contrasenia', 'perfil_id'] 
        });
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};


// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findByPk(req.params.id, {
            attributes: ['id','nombre', 'apellido', 'dni','telefono', 'email','usuario','contrasenia', 'perfil_id']
        });

        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        const nuevoUsuario = await Usuario.create(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        
        res.status(500).json({ error: 'Error al crear el usuario' });
        
    }
};

// Actualizar un usuario existente
exports.actualizarUsuario = async (req, res) => {
    try {
        // Especificar los campos que quieres actualizar
        const camposActualizados = ['nombre','apellido', 'email', 'telefono', 'usuario', 'contrasenia', 'perfil_id']; 

        
        const [actualizar] = await Usuario.update(req.body, {
            where: { id: req.params.id },
            fields: camposActualizados // Solo estos campos serán actualizados
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
exports.eliminarUsuario = async (req, res) => {
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
