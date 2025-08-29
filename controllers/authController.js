const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Usuario, Perfil } = require("../models");
const usuarioEmpresaController = require("../controllers/usuarioEmpresaController");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const { Op } = require("sequelize");
require("dotenv").config();

const login = async (req, res) => {
  const { usuario, contrasenia } = req.body;

  try {
    const usuarios = await Usuario.findOne({
      where: { usuario },
      include: {
        model: Perfil,
        attributes: ["tipo"],
      },
    });
    console.log("usuario", usuario);
    if (!usuarios) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    /*  if (!usuarios.verificado) {
    return res.status(401).json({ mensaje: 'Debes verificar tu email antes de iniciar sesión.' });
     }*/

    const contraseniaValido = await bcrypt.compare(
      contrasenia,
      usuarios.contrasenia
    );

    if (!contraseniaValido) {
      return res.status(401).json({ mensaje: "Contraseña incorrecta" });
    }

    let empresaId = null;
    const empresa = await usuarioEmpresaController.obtenerEmpresaIdDeUsuario(
      usuarios.id
    );
    if (!empresa || empresa.empresa_id == null) {
      console.log("El usuario no tiene asociado una empresa o es un cliente");
      empresaId = null;
    } else {
      empresaId = empresa.empresa_id;
    }

    console.log(
      "ver empresa en el login:",
      empresa,
      empresa.empresa_id,
      empresaId
    );
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
      { expiresIn: "2h" }
    );

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error en el servidor" });
  }
};

const verificarEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const usuario = await Usuario.findOne({
      where: { tokenVerificacion: token },
    });

    if (!usuario) {
      return res.send("<h2>Token inválido o expirado.</h2>");
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
            const deepLink = 'minibus://login';
            const fallbackWeb = 'https://vyvreservas.expo.app/login';

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
    console.error("Error al verificar cuenta:", error);
    return res.status(500).send("Error al verificar la cuenta.");
  }
};

const verificarFinal = async (req, res) => {
  try {
    const { token } = req.params;

    const usuario = await Usuario.findOne({
      where: { tokenVerificacion: token },
    });

    if (!usuario) {
      return res.status(400).json({ error: "Token inválido o expirado." });
    }

    usuario.verificado = true;
    usuario.tokenVerificacion = null;
    usuario.fechaVerificacion = new Date();
    await usuario.save();

    return res.status(200).json({ message: "Cuenta verificada con éxito." });
  } catch (error) {
    console.error("Error al verificar cuenta:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const enviarCorreoVerificacion = async (email, token) => {
  const link = `https://reserva-minubus-m39k.onrender.com/api/auth/verificar/${token}`;

  await transporter.sendMail({
    from: '"Reservas 🚌" <vyvreservas25@gmail.com>',
    to: email,
    subject: "Verificá tu cuenta",
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
    `,
  });
};

const solicitarRecuperacion = async (req, res) => {
  const { email } = req.body;

  try {
    const usuario = await Usuario.findOne({ where: { email } });

    // Seguridad: siempre responder igual aunque no exista el email
    if (!usuario) {
      return res.status(200).json({
        mensaje:
          "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
      });
    }

    // Generar token y expiración (1 hora)
    const token = crypto.randomBytes(32).toString("hex");
    const expiracion = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    usuario.recuperacionToken = token;
    usuario.recuperacionTokenExpira = expiracion;
    await usuario.save();

    const link = `https://reserva-minubus-m39k.onrender.com/api/auth/abrir-app/${token}`;

    await transporter.sendMail({
      from: '"Reservas 🚌" <vyvreservas25@gmail.com>',
      to: usuario.email,
      subject: "Restablecer contraseña",
      html: `
      <h3></h3>
      <p>Hacé clic en el botón para verificar tu cuenta:</p>
      <a href="${link}" style="
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: white;
        text-decoration: none;
        border-radius: 5px;
      ">
        restablecer contraseña
      </a>

      <p>ignora este correo si no te corresponde</p>
    `,
    });
    return res.json({
      mensaje:
        "Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.",
    });
  } catch (error) {
    console.error("Error en recuperación:", error);
    return res.status(500).json({ mensaje: "Error al procesar la solicitud." });
  }
};

const resetearContrasenia = async (req, res) => {
  const { token } = req.params;
  const { nuevaContrasenia } = req.body;

  console.log("llego al back el token:", token);

  try {
    const usuario = await Usuario.findOne({
      where: {
        recuperacionToken: token,
        recuperacionTokenExpira: { [Op.gt]: new Date() },
      },
    });

    if (!usuario) {
      return res.status(400).json({ mensaje: "Token inválido o expirado." });
    }

    const hash = await bcrypt.hash(nuevaContrasenia, 10);
    usuario.contrasenia = hash;
    console.log("el usuario ya tiene la nueva contraseña");
    usuario.recuperacionToken = null;
    usuario.recuperacionTokenExpira = null;
    await usuario.save();

    res.json({ mensaje: "Contraseña actualizada correctamente." });
  } catch (error) {
    console.error("Error al restablecer contraseña:", error);
    res.status(500).json({ mensaje: "Error al actualizar contraseña." });
  }
};

const abrirApp = (req, res) => {
  try {
    const { token } = req.params;
    console.log("***** desde solicitar recuperacion llego a abrir-app");

    // Redirigimos según plataforma (app o web)
    return res.send(`
      <html>
        <head>
          <title>Recuperar contraseña...</title>
          <script>
            // Intenta abrir la app
            const deepLink = 'minibus://resetear/${token}';
            const fallbackWeb = 'https://vyvreservas.expo.app/resetear/${token}';

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
    console.error("Error al recuperar la contraseña cuenta:", error);
    return res.status(500).send("Error al verificar la cuenta.");
  }
};

module.exports = {
  login,
  enviarCorreoVerificacion,
  verificarEmail,
  verificarFinal,
  solicitarRecuperacion,
  resetearContrasenia,
  abrirApp,
};
