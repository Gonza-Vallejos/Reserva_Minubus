const { Usuario } = require('../models');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({
            // Solo los campos a utilizar
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
        const usuario = await Usuario.findAll( {
            where: { id: req.params.id },
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



//Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        const { nombre, apellido, dni, telefono, email, usuario, contrasenia, perfil_id } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);
        // Crear el usuario con los campos separados
        const nuevoUsuario = await Usuario.create({
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            telefono:telefono,
            email:email,
            usuario:usuario,
            contrasenia:hashedPassword,
            perfil_id:perfil_id
        });

        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el usuario' });
    }
};

// nuevo
// Actualizar un usuario existente
exports.actualizarUsuario = async (req, res) => {
    try {
        // Especificar los campos que quieres actualizar
         const { nombre, apellido, email, telefono, usuario} = req.body;
       // const camposActualizados = ['nombre','apellido', 'email', 'telefono', 'usuario', 'perfil_id']; 
        console.log('ver log usuario', req.body)
        
        const [actualizar] = await Usuario.update( {
             nombre: nombre,
             apellido: apellido,
             email: email,
             telefono: telefono,
             usuario: usuario,
             

        },
        {
             where: { id: req.params.id },
             fields: ['nombre','apellido', 'email', 'telefono', 'usuario']    
                });

        if (!actualizar) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado' });
    } catch (error) {
        console.log(req.body)
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

// Eliminar un usuario lógicamente
exports.eliminarUsuario = async (req, res) => {
    try {
        // Actualizar el campo 'eliminado' a 'si'
        const [eliminar] = await Usuario.update({ eliminado: 'si' }, {
            where: { id: req.params.id },
            fields: ['eliminado']
        });

        if (!eliminar) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};



