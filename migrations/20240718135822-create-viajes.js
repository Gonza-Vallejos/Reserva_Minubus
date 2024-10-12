'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Viajes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      origenLocalidad: {
        type: Sequelize.STRING
      },
      destinoLocalidad: {
        type: Sequelize.STRING
      },
      horarioSalida: {
        type: Sequelize.DATE
      },
      fechaViaje: {
        type: Sequelize.DATE
      },
      precio: {
        type: Sequelize.FLOAT
      },
      chofer: {
        type: Sequelize.STRING
      },
      medioTransporte_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'MedioTransporte',
          key: 'id'
        }
      },
      eliminado: {
        type: Sequelize.STRING,
        defaultValue: "no" 
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Viajes');
  }
};