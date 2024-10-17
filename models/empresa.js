'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    
    static associate(models) {
      // Definir asociaciones aquí
      Empresa.belongsTo(models.Localidad, {
        foreignKey: 'localidad_id',
        targetKey: 'id'
      });
      Empresa.hasMany(models.MedioTransporte, {
        foreignKey: 'empresa_id'
      });
    }
  }

  Empresa.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    direccion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cuit: {
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
    localidad_id: {
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
    modelName: 'Empresa',
    tableName: 'empresa'  
  });

  return Empresa;
};
