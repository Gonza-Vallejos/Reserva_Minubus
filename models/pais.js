'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pais extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pais.hasMany(models.provincia, {
        foreignKey: 'pais_id'
      })
    }
  }
  Pais.init({
    nombre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pais',
  });
  return Pais;
};