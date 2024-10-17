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
        foreignKey: 'usuarios_id'
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
    },
    usuario: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 25]
      }
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    perfil_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eliminado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'no'
    }
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuarios'
  });

  return Usuario;
};
