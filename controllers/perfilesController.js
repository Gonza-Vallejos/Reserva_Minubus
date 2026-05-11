const { Perfil, Usuario } = require("../models");

exports.crearPerfil = async (req, res) => {
  try {
    const { tipo } = req.body;

    if (!tipo) {
      return res.status(400).json({ mensaje: 'El campo "tipo" es requerido' });
    }

    const perfil = await Perfil.create({
      tipo: tipo,
    });

    res.status(201).json({ message: "Perfil creado correctamente", perfil });
  } catch (error) {
    console.error("Error al crear perfil:", error);
    res.status(500).json({ error: "Error al crear perfil" });
  }
};

exports.actualizarPerfil = async (req, res) => {
  try {
    const { perfil_id } = req.body;

    console.log("PERFIL_ID:", perfil_id);

    const [actualizar] = await Usuario.update(
      {
        perfil_id: perfil_id,
      },
      {
        where: { id: req.params.id },
        fields: ["perfil_id"],
      }
    );

    if (!actualizar) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({ message: "Perfil actualizado" });
  } catch (error) {
    console.error("Error al actualizar el perfil:", error);
    res.status(500).json({ error: "Error al actualizar el perfil" });
  }
};
