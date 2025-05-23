const { Usuario, Empresa } = require('../models');

exports.asociarUsuarioEmpresa = async (req, res) => {
  try {
    const { empresaId } = req.body;

    const usuario = await Usuario.findByPk(req.params.id);
    const empresa = await Empresa.findByPk(empresaId);

    if (!usuario || !empresa) {
      return res.status(404).json({ mensaje: 'Usuario o empresa no encontrados' });
    }

    await usuario.addEmpresa(empresa); // Relación many-to-many

    res.status(200).json({ mensaje: 'Usuario asociado a la empresa correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al asociar usuario y empresa' });
  }
};

