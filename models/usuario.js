'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    static associate(models) {
      Usuario.belongsTo(models.Perfil, {
        foreignKey: 'perfil_id',
        targetKey: 'id'
      });
      Usuario.hasMany(models.Reserva, {
        foreignKey: 'usuario_id'
      });
    }
  }

  Usuario.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    telefono: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, Infinity]
      }
    },
    contraseña: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 12]
      }
    },
    perfil_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'Usuarios'
  });

  return Usuario;
};
