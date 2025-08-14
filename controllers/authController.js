const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Usuario, Perfil  } = require('../models'); 
const usuarioEmpresaController = require('../controllers/usuarioEmpresaController');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { Op } = require('sequelize');
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
  /*  if (!usuarios.verificado) {
    return res.status(401).json({ mensaje: 'Debes verificar tu email antes de iniciar sesión.' });
     }*/
   
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
            const fallbackWeb = 'https://reserva-minubus-m39k.onrender.com';

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
  const link = `https://reserva-minubus-m39k.onrender.com/api/auth/verificar/${token}`;

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

      <p>ignora este correo si no te corresponde</p>
    `
  });
};



const solicitarRecuperacion = async (req, res) => {
  const { email, plataforma} = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    // Seguridad: siempre responder igual aunque no exista el email
    if (!usuario) {
      return res.status(200).json({
        mensaje: 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.',
      });
    }

    // Generar token y expiración (1 hora)
    const token = crypto.randomBytes(32).toString('hex');
    const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    usuario.recuperacionToken = token;
    usuario.recuperacionTokenExpira = expiracion;
    await usuario.save();

    const enlaceLanding = `https://reserva-minubus-m39k.onrender.com/abrir-app/${token}`;
    const enlaceAppScheme = `minubus://reset/${token}`; // para referencia

    await transporter.sendMail({
      from: '"Reservas 🚌" <vyvreservas25@gmail.com>',
      to: usuario.email,
      subject: 'Restablecer contraseña',
      html: `
        <h3>¿Olvidaste tu contraseña?</h3>
        <p>Al presionar el botón se intentará abrir la app. Si no la tenés instalada, se abrirá la versión web.</p>
        <a href="${enlaceLanding}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Restablecer contraseña</a>

        <p style="margin-top: 20px;">Si preferís abrir manualmente con la app instalada: <code>${enlaceAppScheme}</code></p>
        <p style="margin-top: 10px; font-size: 0.9em;">Este enlace expirará en 1 hora.</p>
      `
    });
    return res.json({
      mensaje: 'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.',
    });

  } catch (error) {
    console.error('Error en recuperación:', error);
    return res.status(500).json({ mensaje: 'Error al procesar la solicitud.' });
  }
};


const resetearContrasenia = async (req, res) => {
  const { token } = req.params;
  const { nuevaContrasenia } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: {
        recuperacionToken: token,
        recuperacionTokenExpira: { [Op.gt]: new Date() },
      },
    });

    if (!usuario) {
      return res.status(400).json({ mensaje: 'Token inválido o expirado.' });
    }

    const hash = await bcrypt.hash(nuevaContrasenia, 10);
    usuario.contrasenia = hash;
    usuario.recuperacionToken = null;
    usuario.recuperacionTokenExpira = null;
    await usuario.save();

    res.json({ mensaje: 'Contraseña actualizada correctamente.' });
  } catch (error) {
    console.error('Error al restablecer contraseña:', error);
    res.status(500).json({ mensaje: 'Error al actualizar contraseña.' });
  }
};

const redirigirReset = (req, res) => {
  const { token } = req.params;
  const userAgent = req.headers['user-agent'];

  const esMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  const plataforma = esMobile ? 'mobile' : 'web';

  console.log('Redirección desde:', plataforma);

  const url = plataforma === 'mobile'
    ? `https://reserva-minubus-m39k.onrender.com/resetear/${token}`        //  Cambiá esto según tu esquema de deep link
    : `https://reserva-minubus-m39k.onrender.com/resetear/${token}`;      // Ruta frontend web

  return res.redirect(url);
};




//-------------------
const abrirApp = (req, res) => {
  const { token } = req.params;

  // Esquema de la app (expo scheme)
  const esquemaApp = `minibus://reset/${token}`;
  // Fallback web al formulario
  const fallbackWeb = `https://reserva-minubus-m39k.onrender.com/resetear-web/${token}`;

  // HTML que intenta abrir el esquema y, si no se abre, redirige al fallback
  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Abrir app Reservas</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 40px; }
          .btn { display:inline-block; padding:12px 20px; background:#007bff; color:white; text-decoration:none; border-radius:6px; }
          p { color: #333; }
        </style>
      </head>
      <body>
        <h2>Abrir la app Reservas</h2>
        <p>Estamos intentando abrir la app para restablecer tu contraseña. Si no ocurre nada, serás redirigido automáticamente a la versión web.</p>
        <a id="openApp" href="${esquemaApp}" class="btn">Abrir en la app</a>
        <p style="margin-top:16px;"><a href="${fallbackWeb}">Ir a la versión web</a></p>

        <script>
          // Intento automático
          (function() {
            // Primer intento: navegar al esquema
            window.location = "${esquemaApp}";

            // Si en 1s no se abrió la app, redirigimos al fallback web
            setTimeout(function() {
              // Para evitar loops si ya estamos en la app, comprobamos document.visibilityState
              if (document.visibilityState === 'visible') {
                window.location = "${fallbackWeb}";
              }
            }, 1000);
          })();
        </script>
      </body>
    </html>
  `);
};

// Mostrar formulario simple en la web (fallback)
const formResetWeb = (req, res) => {
  const { token } = req.params;
  res.send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width,initial-scale=1"/>
        <title>Restablecer contraseña</title>
        <style>
          body { font-family: Arial, sans-serif; display:flex; align-items:center; justify-content:center; height:100vh; margin:0; }
          .card { width: 100%; max-width:420px; padding:20px; box-shadow:0 2px 10px rgba(0,0,0,0.1); border-radius:8px; }
          input, button { width:100%; padding:10px; margin-top:10px; }
          button { background:#007bff; color:white; border:none; border-radius:6px; }
        </style>
      </head>
      <body>
        <div class="card">
          <h3>Restablecer contraseña</h3>
          <form method="POST" action="/resetear/${token}">
            <label>Nueva contraseña</label>
            <input name="nuevaContrasenia" type="password" required minlength="6" />
            <button type="submit">Cambiar contraseña</button>
          </form>
          <p style="font-size:0.9em; color:#666; margin-top:12px;">Si la app está instalada, usá el link del mail para abrirla directamente.</p>
        </div>
      </body>
    </html>
  `);
};



module.exports = { 
  login, 
  enviarCorreoVerificacion,
  verificarEmail,
  verificarFinal,
  solicitarRecuperacion,
  resetearContrasenia,
  redirigirReset ,
  formResetWeb,
  abrirApp

};

