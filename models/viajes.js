"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Viajes extends Model {
    static associate(models) {
      // Relación con MedioTransporte
      Viajes.belongsTo(models.MedioTransporte, {
        foreignKey: "medioTransporte_id",
        targetKey: "id",
      });

      // Relación con Reserva
      Viajes.hasMany(models.Reserva, {
        foreignKey: "viajes_id",
      });

      // Relación con usuarioEmpresa
      Viajes.belongsTo(models.UsuarioEmpresa, {
        foreignKey: "usuarioEmpresa_id",
        targetKey: "id",
        // as: 'usuarioEmpresa'
      });
    }
  }

  Viajes.init(
    {
      origenLocalidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destinoLocalidad: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      horarioSalida: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      fechaViaje: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      cantPasajeros: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      medioTransporte_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      usuarioEmpresa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      eliminado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "no",
      },
    },
    {
      sequelize,
      modelName: "Viajes",
      tableName: "Viajes",
    }
  );

  return Viajes;
};
