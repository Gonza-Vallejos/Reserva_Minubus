'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Empresa', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      cuit: {
        type: Sequelize.INTEGER
      },
      telefono: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      localidad_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Localidad',
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
    await queryInterface.dropTable('Empresa');
  }
};