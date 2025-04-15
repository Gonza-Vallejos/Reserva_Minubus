const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario, Perfil  } = require('../models'); 

const login = async (req, res) => {
  const { usuario, contrasenia } = req.body;
 console.log('******', req.body)
  try {
    const usuarios = await Usuario.findOne({ where: { usuario }, include: {
        model: Perfil,
        attributes: ['tipo'] 
      } });

    if (!usuarios) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    console.log('*******', usuarios.contrasenia)
    console.log('*******', contrasenia)
    const contraseniaValido = await bcrypt.compare(contrasenia, usuarios.contrasenia);
    console.log('*************',contraseniaValido)
    if (!contraseniaValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }
    const perfil = usuarios.Perfil.tipo;
    // Generar el token con perfil incluido
    const token = jwt.sign(
      {
        id: usuarios.id,
        contrasenia: usuarios.contrasenia,
        perfil: perfil, 
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token, perfil });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error en el servidor' });
  }
};

module.exports = { login };
