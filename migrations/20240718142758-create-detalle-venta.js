'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DetalleVenta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      formaPago: {
        type: Sequelize.STRING
      },
      subTotal: {
        type: Sequelize.FLOAT
      },
      descuento: {
        type: Sequelize.FLOAT
      },
      precioFinal: {
        type: Sequelize.FLOAT
      },
      ventas_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Ventas',
          key: 'id'
        }
      },
      reservas_id: {
        type: Sequelize.INTEGER,
        references:{
          model: 'Reservas',
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
    await queryInterface.dropTable('DetalleVenta');
  }
};