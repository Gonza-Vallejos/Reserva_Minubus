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
      Viajes.belongsTo(models.MedioTransporte,{
        foreignKey: 'medioTransporte_id',
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
    origenLocalidad: DataTypes.STRING,
    destinoLocalidad: DataTypes.STRING,
    horarioSalida: DataTypes.DATE,
    fechaViaje: DataTypes.DATE,
    precio: DataTypes.FLOAT,
    chofer: DataTypes.STRING,
    medioTransporte_id: DataTypes.INTEGER,
    eliminado:DataTypes.STRING, allowNull: false
  }, {
    sequelize,
    modelName: 'Viajes',
    tableName: 'VIiajes'
  });
  return Viajes;
};