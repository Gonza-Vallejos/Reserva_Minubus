'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Perfiles', [
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
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Perfiles', null, {});
  }
};
