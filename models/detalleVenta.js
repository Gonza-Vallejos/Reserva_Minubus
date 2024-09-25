'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detalle_Venta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Detalle_Venta.belongsTo(models.Ventas,{
        foreignKey: 'ventas_id',
        target_Key: 'id'
      })
      Detalle_Venta.belongsTo(models.Reserva,{
        foreignKey: 'reservas_id',
        target_Key: 'id'
      })
    }
  }
  Detalle_Venta.init({
    formaPago: DataTypes.STRING,
    subTotal: DataTypes.FLOAT,
    descuento: DataTypes.FLOAT,
    precioFinal: DataTypes.FLOAT,
    ventas_id: DataTypes.INTEGER,
    reservas_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetalleVenta',
    tableName: 'DetalleVenta'
  });
  return Detalle_Venta;
};