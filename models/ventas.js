'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {

    static associate(models) {
      // Definir asociaciones aquí
      Ventas.belongsTo(models.Viajes, {
        foreignKey: 'viajes_id',
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
      allowNull: false
    },
    hora: {
      type: DataTypes.DATE,
      allowNull: false
    },
    totalVentas: {
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
    modelName: 'Ventas',
    tableName: 'ventas'  
  });

  return Ventas;
};
