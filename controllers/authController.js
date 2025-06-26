const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario, Perfil  } = require('../models'); 
const usuarioEmpresaController = require('../controllers/usuarioEmpresaController');
const nodemailer = require('nodemailer');
require('dotenv').config()

const login = async (req, res) => {
  const { usuario, contrasenia } = req.body;

  try {

    const usuarios = await Usuario.findOne({ where: { usuario }, include: {
        model: Perfil,
        attributes: ['tipo'] 
      } });
        console.log('usuario',usuario)
    if (!usuarios) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    if (!usuarios.verificado) {
    return res.status(401).json({ mensaje: 'Debes verificar tu email antes de iniciar sesión.' });
     }
   
    const contraseniaValido = await bcrypt.compare(contrasenia, usuarios.contrasenia);
   
    if (!contraseniaValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    let empresaId = null;
     const empresa = await usuarioEmpresaController.obtenerEmpresaIdDeUsuario(usuarios.id);
      if (!empresa || empresa.empresa_id == null) {
        console.log("El usuario no tiene asociado una empresa o es un cliente")
         empresaId = null;
       }else{
        empresaId = empresa.empresa_id;
       }

    console.log('ver empresa en el login:', empresa, empresa.empresa_id , empresaId)
    const perfil = usuarios.Perfil.tipo;

    // Generar el token con perfil incluido
    const token = jwt.sign(
      {
        id: usuarios.id,
        nombre: usuarios.nombre,
        usuario: usuarios.usuario,
        perfil: perfil, 
        empresa_id: empresaId,
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


const verificarEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: { tokenVerificacion: token } });

    if (!usuario) {
      return res.send('<h2>Token inválido o expirado.</h2>');
    }

    // Verificamos al usuario
    usuario.verificado = true;
    usuario.tokenVerificacion = null;
    usuario.fechaVerificacion = new Date();
    await usuario.save();

    // Redirigimos según plataforma (app o web)
    return res.send(`
      <html>
        <head>
          <title>Verificando cuenta...</title>
          <script>
            // Intenta abrir la app
            const deepLink = 'myapp://login';
            const fallbackWeb = 'http://localhost:8081';

            function isMobile() {
              return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
            }

            if (isMobile()) {
              // Abrir app con deep link
              window.location.href = deepLink;

              // Por si falla (no está instalada), redirigimos a la web después de 2 segundos
              setTimeout(() => {
                window.location.href = fallbackWeb;
              }, 2000);
            } else {
              // Usuario desde PC -> ir al login web
              window.location.href = fallbackWeb;
            }
          </script>
        </head>
        <body>
          <p>Redirigiendo...</p>
        </body>
      </html>
    `);
  } catch (error) {
    console.error('Error al verificar cuenta:', error);
    return res.status(500).send('Error al verificar la cuenta.');
  }
};



const verificarFinal = async (req, res) => {
  try {
    const { token } = req.params;

    const usuario = await Usuario.findOne({ where: { tokenVerificacion: token } });

    if (!usuario) {
      return res.status(400).json({ error: 'Token inválido o expirado.' });
    }

    usuario.verificado = true;
    usuario.tokenVerificacion = null;
    usuario.fechaVerificacion = new Date();
    await usuario.save();

    return res.status(200).json({ message: 'Cuenta verificada con éxito.' });
  } catch (error) {
    console.error('Error al verificar cuenta:', error);
    return res.status(500).json({ error: 'Error interno del servidor.' });
  }
};



const transporter = nodemailer.createTransport({

  
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});



const enviarCorreoVerificacion = async (email, token) => {
  const link = `http://localhost:3000/api/auth/verificar/${token}`;

  await transporter.sendMail({
    from: '"Reservas 🚌" <vyvreservas25@gmail.com>',
    to: email,
    subject: 'Verificá tu cuenta',
    html: `
      <h3>¡Gracias por registrarte!</h3>
      <p>Hacé clic en el botón para verificar tu cuenta:</p>
      <a href="${link}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">
        Verificar cuenta
      </a>
    `
  });
};



module.exports = { 
  login, 
  enviarCorreoVerificacion,
  verificarEmail,verificarFinal
};

