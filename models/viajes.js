'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Viajes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Viajes.belongsTo(models.Medio_Transporte,{
        foreignKey: 'medio_transporte_id',
        target_Key: 'id'
      })
      Viajes.hasMany(models.Ventas,{
        foreignKey: 'viajes_id'
      })
      Viajes.hasMany(models.Reserva,{
        foreignKey: 'viajes_id'
      })
    }
  }
  Viajes.init({
    origen_localidad: DataTypes.STRING,
    destino_localidad: DataTypes.STRING,
    horario_salida: DataTypes.DATE,
    fecha_viaje: DataTypes.DATE,
    precio: DataTypes.FLOAT,
    chofer: DataTypes.STRING,
    medio_transporte_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Viajes',
    tableName: 'viajes'
  });
  return Viajes;
};