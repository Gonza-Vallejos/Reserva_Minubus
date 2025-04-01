'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Alterar la columna 'fechaReserva' para cambiar el tipo a STRING
    await queryInterface.changeColumn('Reservas', 'fechaReserva', {
      type: Sequelize.DATE.toString(),
      allowNull: true 
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir el tipo de la columna 'fechaReserva' a DATE en caso de deshacer
    await queryInterface.changeColumn('Reservas', 'fechaReserva', {
      type: Sequelize.DATE,
      allowNull: true 
    });
  }
};
