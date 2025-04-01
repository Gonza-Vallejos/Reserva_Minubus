'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Eliminar las columnas 'ubicacionOrigen' y 'ubicacionDestino'
    await queryInterface.removeColumn('reservas', 'ubicacionOrigen');
    await queryInterface.removeColumn('reservas', 'ubicacionDestino');
  },

  down: async (queryInterface, Sequelize) => {
   
    await queryInterface.addColumn('reservas', 'ubicacionOrigen', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
    await queryInterface.addColumn('reservas', 'ubicacionDestino', {
      type: Sequelize.STRING,
      allowNull: true, 
    });
  }
};
