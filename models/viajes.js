'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Viajes extends Model {

    static associate(models) {
      // Definir asociaciones aquí
      Viajes.belongsTo(models.MedioTransporte, {
        foreignKey: 'medioTransporte_id',
        targetKey: 'id'
      });
      Viajes.hasMany(models.Ventas, {
        foreignKey: 'viajes_id'
      });
      Viajes.hasMany(models.Reserva, {
        foreignKey: 'viajes_id'
      });
    }
  }

  Viajes.init({
    origenLocalidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    destinoLocalidad: {
      type: DataTypes.STRING,
      allowNull: false
    },
    horarioSalida: {
      type: DataTypes.DATE,
      allowNull: false
    },
    fechaViaje: {
      type: DataTypes.DATE,
      allowNull: false
    },
    precio: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    chofer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    medioTransporte_id: {
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
    modelName: 'Viajes',
    tableName: 'viajes'  
  });

  return Viajes;
};
