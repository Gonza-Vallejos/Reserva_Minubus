'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetalleReserva extends Model {
    
    static associate(models) {
      // Asociación con el modelo Reserva
      DetalleReserva.belongsTo(models.Reserva, {
        foreignKey: 'reserva_id',
        targetKey: 'id'
       
      });
    }
  }

  DetalleReserva.init({
    nombre: {
      type: DataTypes.STRING,
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
    modelName: 'DetalleReserva',
    tableName: 'detallereserva',
    timestamps: false
  });

  return DetalleReserva;
};
