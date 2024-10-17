'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Perfil extends Model {

    static associate(models) {
      // Definir asociaciones aquí
      Perfil.hasMany(models.Usuario, {
        foreignKey: 'perfil_id'
      });
    }
  }

  Perfil.init({
    tipo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    eliminado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'no'
    }
  }, {
    sequelize,
    modelName: 'Perfil',
    tableName: 'perfiles' 
  });

  return Perfil;
};
