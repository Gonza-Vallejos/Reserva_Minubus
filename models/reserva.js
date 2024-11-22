'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Reserva extends Model {

    static associate(models) {
      // Definir asociaciones aquí
      Reserva.belongsTo(models.Usuario, {
        foreignKey: 'usuarios_id',
        targetKey: 'id'
      });
      Reserva.belongsTo(models.Viajes, {
        foreignKey: 'viajes_id',
        targetKey: 'id'
      });
      Reserva.hasMany(models.DetalleVenta, {
        foreignKey: 'reservas_id'
      });
      Reserva.hasMany(models.DetalleReserva, {
         foreignKey: 'reserva_id' 
        })
    }
  }

  Reserva.init({
   
    fechaReserva: {
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('fechaReserva');
        // return rawValue ? rawValue.toISOString().replace('T', ' ').split('.')[0] : null;
         return rawValue ? rawValue.toISOString() : null;

         // Formateo en formato "DD/MM/YYYY" o similar, según la configuración regional
         /* return rawValue ? rawValue.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false // Especifica formato de 24 horas
      }) : null;*/
 
      }
    },
    usuarios_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    viajes_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    eliminado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'no'
    }
  }, {
    sequelize,
    modelName: 'Reserva',
    tableName: 'reservas'  
  });

  return Reserva;
};
