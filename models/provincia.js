'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Provincia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Provincia.belongsTo(models.Pais, {
        foreignKey: 'pais_id',
        target_Key: 'id'
      })
      Provincia.hasMany(models.Localidad, {
        foreignKey: 'provincia_id'
      })
    }
  }
  Provincia.init({
    nombre: DataTypes.STRING,
    pais_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Provincia',
    tableName: 'provincia'
  });
  return Provincia;
};