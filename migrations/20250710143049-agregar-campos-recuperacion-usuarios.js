'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    //  Agregar columna 'recuperacionToken'
    await queryInterface.addColumn('usuarios', 'recuperacionToken', {
      type: Sequelize.STRING,
      allowNull: true,
      after: 'fechaVerificacion' 
    });

    //  Agregar columna 'recuperacionTokenExpira'
    await queryInterface.addColumn('usuarios', 'recuperacionTokenExpira', {
      type: Sequelize.DATE,
      allowNull: true,
      after: 'recuperacionToken'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Eliminar campos si se hace rollback
    await queryInterface.removeColumn('usuarios', 'recuperacionTokenExpira');
    await queryInterface.removeColumn('usuarios', 'recuperacionToken');
  }
};
