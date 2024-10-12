'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MedioTransporte', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      patente: {
        type: Sequelize.STRING
      },
      marca: {
        type: Sequelize.STRING
      },
      cantLugares: {
        type: Sequelize.INTEGER
      },
      empresa_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'Empresa',
          key: 'id'}
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
    await queryInterface.dropTable('MedioTransporte');
  }
};