const { Perfil } = require('../models');

exports.crearPerfil = async (req, res) => {
    try {
      const { tipo } = req.body;
  
      if (!tipo) {
        return res.status(400).json({ mensaje: 'El campo "tipo" es requerido' });
      }
  
      const perfil = await Perfil.create({
        tipo: tipo
      });
  
      res.status(201).json({ message: 'Perfil creado correctamente', perfil });
    } catch (error) {
      console.error('Error al crear perfil:', error);
      res.status(500).json({ error: 'Error al crear perfil' });
    }
  };
  
