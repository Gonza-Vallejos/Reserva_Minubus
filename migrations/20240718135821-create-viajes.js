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
      origen_localidad: {
        type: Sequelize.STRING
      },
      destino_localidad: {
        type: Sequelize.STRING
      },
      horario_salida: {
        type: Sequelize.DATE
      },
      fecha_viaje: {
        type: Sequelize.DATE
      },
      precio: {
        type: Sequelize.FLOAT
      },
      chofer: {
        type: Sequelize.STRING
      },
      medio_transporte_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Medio_Transporte',
          key: 'id'
        }
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