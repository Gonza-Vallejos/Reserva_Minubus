'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar las columnas 'ubicacionOrigen' y 'ubicacionDestino'
    await queryInterface.removeColumn('reservas', 'ubicacionOrigen');
    await queryInterface.removeColumn('reservas', 'ubicacionDestino');
  },

  down: async (queryInterface, Sequelize) => {
    // En caso de que necesites revertir la migración, puedes agregar nuevamente las columnas
    await queryInterface.addColumn('reservas', 'ubicacionOrigen', {
      type: Sequelize.STRING,
      allowNull: true, // o 'false' dependiendo de tu necesidad
    });
    await queryInterface.addColumn('reservas', 'ubicacionDestino', {
      type: Sequelize.STRING,
      allowNull: true, // o 'false' dependiendo de tu necesidad
    });
  }
};
