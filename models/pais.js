'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pais extends Model {

    static associate(models) {
      // Definir asociaciones aquí
      Pais.hasMany(models.Provincia, {
        foreignKey: 'pais_id'
      });
    }
  }

  Pais.init({
    nombre: {
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
    modelName: 'Pais',
    tableName: 'pais'  
  });

  return Pais;
};
