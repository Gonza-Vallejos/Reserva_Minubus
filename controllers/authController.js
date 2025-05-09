const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario, Perfil  } = require('../models'); 

const login = async (req, res) => {
  const { usuario, contrasenia } = req.body;

  try {
    const usuarios = await Usuario.findOne({ where: { usuario }, include: {
        model: Perfil,
        attributes: ['tipo'] 
      } });

    if (!usuarios) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
   
    const contraseniaValido = await bcrypt.compare(contrasenia, usuarios.contrasenia);
   
    if (!contraseniaValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
    const perfil = usuarios.Perfil.tipo;
    // Generar el token con perfil incluido
    const token = jwt.sign(
      {
        id: usuarios.id,
        nombre: usuarios.nombre,
        usuario: usuarios.usuario,
        perfil: perfil, 
      },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };
