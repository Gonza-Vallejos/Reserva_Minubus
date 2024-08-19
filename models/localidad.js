'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Localidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Localidad.belongsTo(models.Provincia, {
        foreignKey: 'provincia_id',
        target_Key: 'id'
      })
    }
  }
  Localidad.init({
    nombre: DataTypes.STRING,
    provincia_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Localidad',
  });
  return Localidad;
};