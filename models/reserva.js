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
      Reserva.hasMany(models.DetalleVenta,{
        foreignKey: 'reservas_id'
      })
    }
  }
  Reserva.init({
    ubicacionOrigen: DataTypes.STRING,
    ubicacionDestino: DataTypes.STRING,
    fechaReserva: DataTypes.DATE,
    usuarios_id: DataTypes.INTEGER,
    viajes_id: DataTypes.INTEGER,
    eliminado:DataTypes.STRING, allowNull: false

  }, {
    sequelize,
    modelName: 'Reserva',
    tableName: 'reservas'
  });
  return Reserva;
};