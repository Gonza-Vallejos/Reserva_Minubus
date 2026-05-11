'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Viajes', 'cantPasajeros', {
      type: Sequelize.INTEGER,
      after: 'precio' // Esto funciona solo en MySQL
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Viajes', 'cantPasajeros');
  }
};

