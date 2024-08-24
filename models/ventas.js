'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ventas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Ventas.belongsTo(models.Viajes,{
        foreignKey: 'viajes_id',
        target_Key: 'id'
      })
      Ventas.hasMany(models.Detalle_Venta,{
        foreignKey: 'ventas_id'
      })
    }
  }
  Ventas.init({
    fecha: DataTypes.DATE,
    hora: DataTypes.DATE,
    total_ventas: DataTypes.INTEGER,
    viajes_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ventas',
    tableName: 'ventas'
  });
  return Ventas;
};