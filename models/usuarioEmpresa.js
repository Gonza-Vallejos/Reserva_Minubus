'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UsuarioEmpresa extends Model {
    static associate(models) {
      UsuarioEmpresa.belongsTo(models.Usuario, {
        foreignKey: 'id_usuario',
        targetKey: 'id',
       // as: 'usuario'
      });

      UsuarioEmpresa.belongsTo(models.Empresa, {
        foreignKey: 'id_empresa',
        targetKey: 'id',
       // as: 'empresa'
      });

      UsuarioEmpresa.hasMany(models.Viajes, {
        foreignKey: 'usuarioEmpresa_id'
      });
    }
  }

  UsuarioEmpresa.init({
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresa',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'UsuarioEmpresa',
    tableName: 'usuarioEmpresa',
    timestamps: true
  });

  return UsuarioEmpresa;
};
