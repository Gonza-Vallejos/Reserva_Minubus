'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pais', [
      {
        id: 1,  // Asume que el ID es 1; ajusta según sea necesario
        nombre: 'Argentina',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pais', null, {});
  }
};
