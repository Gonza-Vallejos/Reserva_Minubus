'use strict';

/** @type {import('sequelize-cli').Migration} */
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn('Viajes', 'horarioSalida', {
        type: Sequelize.TIME,
        allowNull: false
      });
      console.log("Columna 'horarioSalida' cambiada a TIME exitosamente.");
    } catch (error) {
      console.error("Error al cambiar la columna 'horarioSalida' a TIME:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.changeColumn('Viajes', 'horarioSalida', {
        type: Sequelize.DATE,
        allowNull: false
      });
      console.log("Columna 'horarioSalida' revertida a DATE exitosamente.");
    } catch (error) {
      console.error("Error al revertir la columna 'horarioSalida' a DATE:", error);
      throw error;
    }
  }
};

