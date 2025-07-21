'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {

    static associate(models) {
      // Definir asociaciones aquí
      Ventas.belongsTo(models.Reserva, {
        foreignKey: 'reserva_id',
        targetKey: 'id'
      });
      Ventas.hasMany(models.DetalleVenta, {
        foreignKey: 'ventas_id'
      });
    }
  }

  Ventas.init({
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
     
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false
    },
    totalVentas: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reserva_id: {
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
    modelName: 'Ventas',
    tableName: 'Ventas'  
  });

  return Ventas;
};
