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
      Detalle_Venta.belongsTo(models.ventas,{
        foreignKey: 'ventas_id',
        target_Key: 'id'
      })
      Detalle_Venta.belongsTo(models.reservas,{
        foreignKey: 'reservas_id',
        target_Key: 'id'
      })
    }
  }
  Detalle_Venta.init({
    forma_pago: DataTypes.STRING,
    sub_total: DataTypes.FLOAT,
    descuento: DataTypes.FLOAT,
    precio_final: DataTypes.FLOAT,
    ventas_id: DataTypes.INTEGER,
    reservas_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Detalle_Venta',
  });
  return Detalle_Venta;
};