'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reserva.belongsTo(models.Usuario,{
        foreignKey: 'usuarios_id',
        target_Key: 'id'
      })
      Reserva.belongsTo(models.Viajes,{
        foreignKey: 'viajes_id',
        target_Key: 'id'
      })
      Reserva.hasMany(models.Detalle_Venta,{
        foreignKey: 'reservas_id'
      })
    }
  }
  Reserva.init({
    ubicacion_origen: DataTypes.STRING,
    ubicacion_destino: DataTypes.STRING,
    fecha_reserva: DataTypes.DATE,
    usuarios_id: DataTypes.INTEGER,
    viajes_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reserva',
  });
  return Reserva;
};