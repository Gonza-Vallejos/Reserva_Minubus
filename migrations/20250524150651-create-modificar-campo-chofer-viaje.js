'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
 
    await queryInterface.removeColumn('viajes', 'chofer');

    await queryInterface.addColumn('viajes', 'usuarioEmpresa_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'usuarioEmpresa',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('viajes', 'usuarioEmpresa_id');


    await queryInterface.addColumn('viajes', 'chofer', {
      type: Sequelize.STRING,
      allowNull: true 
    });
  }
};
