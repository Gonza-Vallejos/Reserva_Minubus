'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pasajeros extends Model {
    
    static associate(models) {
      // Asociación con el modelo Reserva
      Pasajeros.belongsTo(models.Reserva, {
        foreignKey: 'reserva_id',
        targetKey: 'id'
       
      });
    }
  }

  Pasajeros.init({
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
      allowNull: false
    },
    ubicacionOrigen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ubicacionDestino: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reserva_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Pasajeros',
    tableName: 'pasajeros',
    timestamps: false
  });

  return Pasajeros;
};
