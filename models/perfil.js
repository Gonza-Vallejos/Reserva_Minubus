'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Perfil extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Perfil.hasMany(models.usuario, {
        foreignKey: 'perfil_id'
      })
    }
  }
  Perfil.init({
    tipo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Perfil',
  });
  return Perfil;
};