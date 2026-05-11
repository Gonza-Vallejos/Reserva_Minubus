'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn('Ventas', 'hora', {
        type: Sequelize.TIME,
        allowNull: false
      });
      console.log("Columna 'hora' cambiada a TIME exitosamente.");
    } catch (error) {
      console.error("Error al cambiar la columna 'hora' a TIME:", error);
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.changeColumn('Ventas', 'hora', {
        type: Sequelize.DATE,
        allowNull: false
      });
      console.log("Columna 'hora' revertida a DATE exitosamente.");
    } catch (error) {
      console.error("Error al revertir la columna 'hora' a DATE:", error);
      throw error;
    }
  }
};
