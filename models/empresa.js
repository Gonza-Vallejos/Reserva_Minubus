'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Empresa.belongsTo(models.localidad, {
        foreignKey: 'localidad_id',
        target_Key: 'id'
      })
      Empresa.hasMany(models.medio_transporte,{
        foreignKey: 'empresa_id'
      })
    }
  }
  Empresa.init({
    nombre: DataTypes.STRING,
    direccion: DataTypes.STRING,
    cuit: DataTypes.INTEGER,
    telefono: DataTypes.INTEGER,
    email: DataTypes.STRING,
    localidad_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Empresa',
  });
  return Empresa;
};