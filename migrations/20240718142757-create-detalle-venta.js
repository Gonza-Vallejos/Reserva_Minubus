'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Detalle_Venta', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      forma_pago: {
        type: Sequelize.STRING
      },
      sub_total: {
        type: Sequelize.FLOAT
      },
      descuento: {
        type: Sequelize.FLOAT
      },
      precio_final: {
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
    await queryInterface.dropTable('Detalle_Venta');
  }
};