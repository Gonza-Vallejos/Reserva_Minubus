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

exports.obtenerEmpresaIdDeUsuario = async (id) => {
    const usuarioId = id; // ID del usuario recibido por parámetro

    try {
        const asociacion = await UsuarioEmpresa.findOne({
            where: { id_usuario: usuarioId }
        });

        if (!asociacion) {
            return ({ mensaje: 'El usuario no está asociado a ninguna empresa' });
        }

        return ({ empresa_id: asociacion.id_empresa });
    } catch (error) {
        console.error('Error al verificar asociación del usuario:', error);
       throw error;
    }
};

exports.obtenerUsuarioEmpresaId = async (req, res) => {
    try {
        const usuarioEmpresa = await UsuarioEmpresa.findByPk(req.params.id, {
            attributes: ['id', 'id_usuario', 'id_empresa']
        });
        return usuarioEmpresa; // Retorna el objeto si existe o `null` si no se encuentra
    } catch (error) {
        console.error("Error al obtener el usuario empresa:", error);
        throw error;
    }
};

//Listar todos los usuarios de una empresa 

exports.obtenerUsuariosPorEmpresa = async (req, res) => {
  const empresa_id = req.params.id;

  try {
        const usuariosEmpresa = await UsuarioEmpresa.findAll({
        where: { id_empresa: empresa_id},
        include: [
            {
            model: Usuario,
            where: { eliminado: 'no'},
            attributes: ['id', 'nombre', 'apellido','email', 'telefono', 'perfil_id']
            }
        ]
        });


    if (!usuariosEmpresa || usuariosEmpresa.length === 0) {
      return res.status(404).json({ mensaje: 'No hay usuarios asociados a la empresa' });
    }

    const usuariosFinales = usuariosEmpresa.map((registro) => registro.Usuario); // con mayúscula

    return res.status(200).json(usuariosFinales);
  } catch (error) {
    console.error('Error al obtener los usuarios de la empresa:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};
