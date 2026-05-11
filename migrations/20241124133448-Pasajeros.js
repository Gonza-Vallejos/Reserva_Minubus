'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Crear la nueva tabla 'pasajeros'
    await queryInterface.createTable('pasajeros', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellido: {
        type: Sequelize.STRING,
        allowNull: false, // Cambiar si no es obligatorio
      },
      dni: {
        type: Sequelize.INTEGER,
        allowNull: false, // Cambiar si no es obligatorio
      },
      ubicacionOrigen: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      ubicacionDestino: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      reserva_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Reservas', // Nombre de la tabla de reservas
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        comment: 'Referencia a la reserva principal'
      },
      eliminado: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "no" ,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

   
  },

};