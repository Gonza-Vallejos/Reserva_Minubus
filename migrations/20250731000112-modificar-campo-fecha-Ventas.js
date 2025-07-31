'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Desactivar restricciones
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    // Cambiar columnas
    await queryInterface.changeColumn('Ventas', 'fecha', {
     type: Sequelize.DATE,
      allowNull: true 
    });

   

    // Volver a activar restricciones
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    await queryInterface.changeColumn('Ventas', 'fecha', {
      type: Sequelize.DATE.toString(),
      allowNull: true 
    });

   

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  },
};
