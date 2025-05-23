'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class usuarioEmpresa extends Model {
    static associate(models) {
        usuarioEmpresa.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        targetKey: 'id'
      });

      usuarioEmpresa.belongsTo(models.Empresa, {
        foreignKey: 'id_empresa',
        targetKey: 'id'
      });
    }
  }

  usuarioEmpresa.init({
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios', // nombre de la tabla (no del modelo)
        key: 'id'
      }
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresa',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'usuarioEmpresa',
    tableName: 'usuarioEmpresa',
    timestamps: true
  });

  return usuarioEmpresa;
};