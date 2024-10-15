'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Detalle_Venta extends Model {
    
    static associate(models) {
      // Definir asociaciones aquí
      Detalle_Venta.belongsTo(models.Ventas, {
        foreignKey: 'ventas_id',
        targetKey: 'id'
      });
      Detalle_Venta.belongsTo(models.Reserva, {
        foreignKey: 'reservas_id',
        targetKey: 'id'
      });
    }
  }

  Detalle_Venta.init({
    formaPago: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    descuento: {
      type: DataTypes.FLOAT
    },
    precioFinal: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    ventas_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    reservas_id: {
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
    modelName: 'DetalleVenta',
    tableName: 'detalleventas'
  });

  return Detalle_Venta;
};
