'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {

    static associate(models) {
      // Definir asociaciones aquí
      Reserva.belongsTo(models.Usuario, {
        foreignKey: 'usuarios_id',
        targetKey: 'id'
      });
      Reserva.belongsTo(models.Viajes, {
        foreignKey: 'viajes_id',
        targetKey: 'id'
      });
      Reserva.hasMany(models.DetalleVenta, {
        foreignKey: 'reservas_id'
      });
    }
  }

  Reserva.init({
    ubicacionOrigen: {
      type: DataTypes.STRING,
      allowNull: false
    },
    ubicacionDestino: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fechaReserva: {
      type: DataTypes.DATE,
      allowNull: false
    },
    usuarios_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    viajes_id: {
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
    modelName: 'Reserva',
    tableName: 'reservas'  
  });

  return Reserva;
};
