'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Desactivar restricciones
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    // Cambiar columnas
    await queryInterface.changeColumn('empresa', 'telefono', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn('empresa', 'cuit', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });

    // Volver a activar restricciones
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    await queryInterface.changeColumn('empresa', 'telefono', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });

    await queryInterface.changeColumn('empresa', 'cuit', {
      type: Sequelize.INTEGER,
      allowNull: false,
      unique: true,
    });

    await queryInterface.sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
  },
};
