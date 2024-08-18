'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('perfils', [
      {
        id: 1,
        tipo: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        tipo: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Agrega más perfiles si es necesario
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('perfils', null, {});
  }
};
