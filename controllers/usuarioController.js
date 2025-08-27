const { Usuario, UsuarioEmpresa, Empresa } = require("../models");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const { enviarCorreoVerificacion } = require("../controllers/authController");

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      // Solo los campos a utilizar
      where: { eliminado: "no" },
      attributes: [
        "id",
        "nombre",
        "apellido",
        "dni",
        "telefono",
        "email",
        "usuario",
        "contrasenia",
        "perfil_id",
      ],
    });
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
  try {
    const usuario = await Usuario.findAll({
      where: { id: req.params.id },
      attributes: [
        "id",
        "nombre",
        "apellido",
        "dni",
        "telefono",
        "email",
        "usuario",
        "contrasenia",
        "perfil_id",
      ],
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

//Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
  try {
    const { nombre, apellido, dni, telefono, email, usuario, contrasenia } =
      req.body;
    const perfil_id = 5;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);

    // Generar token de verificación
    const tokenVerificacion = uuidv4();
    // Crear el usuario con los campos separados
    const nuevoUsuario = await Usuario.create({
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      telefono: telefono,
      email: email,
      usuario: usuario,
      contrasenia: hashedPassword,
      perfil_id: perfil_id,
      verificado: false,
      tokenVerificacion: tokenVerificacion,
    });

    // Enviar email con el token
    await enviarCorreoVerificacion(email, tokenVerificacion);
    res.status(201).json({
      mensaje: "Usuario registrado. Se envió un email de verificación.",
      emailVerificacionEnviada: true,
    });
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// nuevo
// Actualizar un usuario existente
exports.actualizarUsuario = async (req, res) => {
  try {
    // Especificar los campos que quieres actualizar
    const { nombre, apellido, email, telefono, usuario, perfil_id } = req.body;

    const [actualizar] = await Usuario.update(
      {
        nombre: nombre,
        apellido: apellido,
        email: email,
        telefono: telefono,
        usuario: usuario,
        perfil_id: perfil_id,
      },
      {
        where: { id: req.params.id },
        fields: [
          "nombre",
          "apellido",
          "email",
          "telefono",
          "usuario",
          "perfil_id",
        ],
      }
    );

    if (!actualizar) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario actualizado" });
  } catch (error) {
    console.log(req.body);
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

// Eliminar un usuario lógicamente
exports.eliminarUsuario = async (req, res) => {
  try {
    // Actualizar el campo 'eliminado' a 'si'
    const [eliminar] = await Usuario.update(
      { eliminado: "si" },
      {
        where: { id: req.params.id },
        fields: ["eliminado"],
      }
    );

    if (!eliminar) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

exports.actualizarContrasenia = async (req, res) => {
  const { contraseniaActual, nuevaContrasenia } = req.body;
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);

    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const coincide = await bcrypt.compare(
      contraseniaActual,
      usuario.contrasenia
    );

    if (!coincide) {
      return res
        .status(401)
        .json({ error: "La contraseña actual es incorrecta" });
    }

    const nuevaHash = await bcrypt.hash(nuevaContrasenia, 10);
    usuario.contrasenia = nuevaHash;

    await usuario.save();

    res.status(200).json({ mensaje: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar la contraseña", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

//  Obtener TODOS los choferes asociados a alguna empresa y que no estén eliminados
exports.obtenerUsuariosChoferAsociados = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: [
        "id",
        "nombre",
        "apellido",
        "dni",
        "telefono",
        "email",
        "usuario",
        "perfil_id",
      ],
      where: {
        perfil_id: 4, // Solo choferes
        eliminado: "no", // Solo los NO eliminados
      },
      include: [
        {
          model: UsuarioEmpresa,
          attributes: ["id", "id_empresa"],
          required: true, // Solo si están en usuarioEmpresa
          include: [
            {
              model: Empresa,
              attributes: ["id", "nombre"],
            },
          ],
        },
      ],
    });

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener los usuarios chofer asociados:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los usuarios chofer asociados" });
  }
};

//  Obtener choferes por ID de empresa (y no eliminados)
exports.obtenerUsuariosChoferPorEmpresa = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: [
        "id",
        "nombre",
        "apellido",
        "dni",
        "telefono",
        "email",
        "usuario",
        "perfil_id",
      ],
      where: {
        perfil_id: 4, // Solo choferes
        eliminado: "no", // Solo los NO eliminados
      },
      include: [
        {
          model: UsuarioEmpresa,
          attributes: ["id", "id_empresa"],
          required: true, // Solo si están en usuarioEmpresa
          where: {
            id_empresa: req.params.id,
          },
          include: [
            {
              model: Empresa,
              attributes: ["id", "nombre"],
            },
          ],
        },
      ],
    });

    if (usuarios.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay usuarios chofer asociados a esta empresa." });
    }

    res.status(200).json(usuarios);
  } catch (error) {
    console.error("Error al obtener los choferes de la empresa:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los choferes de la empresa." });
  }
};
