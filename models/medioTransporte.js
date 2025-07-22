'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Medio_Transporte extends Model {

    static associate(models) {
      // Definir asociaciones aquí
      Medio_Transporte.belongsTo(models.Empresa, {
        foreignKey: 'empresa_id',
        targetKey: 'id'
      });
      Medio_Transporte.hasMany(models.Viajes, {
        foreignKey: 'medioTransporte_id'
      });
    }
  }

  Medio_Transporte.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    patente: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cantLugares: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    empresa_id: {
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
    modelName: 'MedioTransporte',
    tableName: 'MedioTransporte'  
  });

  return Medio_Transporte;
};
