'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define associations
      Usuario.belongsTo(models.Perfil, {
        foreignKey: 'perfil_id',
        target_Key: 'id'
      });
      Usuario.hasMany(models.Reserva, {
        foreignKey: 'usuarios_id'
      });
    }
  }

  Usuario.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    dni: DataTypes.INTEGER,
    telefono: DataTypes.INTEGER,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'El correo ya está en uso.'
      },
      validate: {
        isEmail: {
          msg: 'El formato del correo electrónico no es válido.'
        }
      }
    },
    usuario: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    perfil_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
  });

  return Usuario;
};
