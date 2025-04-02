'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    // Alterar la columna 'fecha' para cambiar el tipo a STRING
    await queryInterface.changeColumn('Ventas', 'fecha', {
      type: Sequelize.DATE.toString(),
      allowNull: true 
    });
  },

  async down (queryInterface, Sequelize) {
     // Revertir el tipo de la columna 'fechaReserva' a DATE en caso de deshacer
     await queryInterface.changeColumn('Ventas', 'fecha', {
      type: Sequelize.DATE,
      allowNull: true 
    });
  
  }
};
