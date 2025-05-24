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

      // Relación inversa para Viajes 
      usuarioEmpresa.hasMany(models.Viajes, {
        foreignKey: 'usuarioEmpresa_id'
      });
    }
  }

  usuarioEmpresa.init({
    id: { // Nuevo campo id como clave primaria
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_usuario: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarios', // nombre de la tabla
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    id_empresa: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'empresa', // nombre de la tabla
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'usuarioEmpresa',
    tableName: 'usuarioEmpresa',
    timestamps: true
  });

  return usuarioEmpresa;
};
