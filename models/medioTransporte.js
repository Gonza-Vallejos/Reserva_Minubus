'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medio_Transporte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Medio_Transporte.belongsTo(models.Empresa,{
        foreignKey: 'empresa_id',
        target_Key: 'id'
      })
      Medio_Transporte.hasMany(models.Viajes, {
        foreignKey: 'medioTransporte_id'
      })
    }
  }
  Medio_Transporte.init({
    nombre: DataTypes.STRING,
    patente: DataTypes.STRING,
    marca: DataTypes.STRING,
    cantLugares: DataTypes.INTEGER,
    empresa_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MedioTransporte',
    tableName: 'MedioTransporte',
  });
  return Medio_Transporte;
};