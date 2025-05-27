const { Usuario, Empresa, UsuarioEmpresa} = require('../models');



exports.asociarUsuarioEmpresa = async (req, res) => {
  try {
    const { empresaId } = req.body;

    const usuario = await Usuario.findByPk(req.params.id);
    const empresa = await Empresa.findByPk(empresaId);

    if (!usuario || !empresa) {
      return res.status(404).json({ mensaje: 'Usuario o empresa no encontrados' });
    }

    await usuario.addEmpresa(empresa); 

    res.status(200).json({ mensaje: 'Usuario asociado a la empresa correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al asociar usuario y empresa' });
  }
};


exports.obtenerEmpresaDeUsuario = async (req, res) => {
    const usuarioId = req.params.id; // ID del usuario recibido por parámetro

    try {
        const asociacion = await UsuarioEmpresa.findOne({
            where: { usuario_id: usuarioId }
        });

        if (!asociacion) {
            return res.status(404).json({ mensaje: 'El usuario no está asociado a ninguna empresa' });
        }

        return res.status(200).json({ empresa_id: asociacion.empresa_id });
    } catch (error) {
        console.error('Error al verificar asociación del usuario:', error);
        return res.status(500).json({ error: 'Error del servidor' });
    }
};


exports.obtenerUsuarioEmpresaId = async (id) => {
    try {
        const usuarioEmpresa = await UsuarioEmpresa.findByPk(id, {
            attributes: ['id', 'id_usuario', 'id_empresa']
        });
        return usuarioEmpresa; // Retorna el objeto si existe o `null` si no se encuentra
    } catch (error) {
        console.error("Error al obtener el usuario empresa:", error);
        throw error;
    }
};

