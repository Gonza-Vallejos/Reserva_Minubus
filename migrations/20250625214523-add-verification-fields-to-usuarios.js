'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Usuarios', 'verificado', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });

    await queryInterface.addColumn('Usuarios', 'tokenVerificacion', {
      type: Sequelize.STRING,
      allowNull: true
    });

    await queryInterface.addColumn('Usuarios', 'fechaVerificacion', {
      type: Sequelize.DATE,
      allowNull: true
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Usuarios', 'verificado');
    await queryInterface.removeColumn('Usuarios', 'tokenVerificacion');
    await queryInterface.removeColumn('Usuarios', 'fechaVerificacion');
  }
};
