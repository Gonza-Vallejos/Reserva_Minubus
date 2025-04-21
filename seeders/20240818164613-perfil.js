'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Perfiles', [
      {
        id: 1,
        tipo: 'usuarioAdministrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        tipo: 'usuarioEmpresa',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        tipo: 'usuarioMostrador',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        tipo: 'usuarioChofer',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        tipo: 'usuarioCliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Perfiles', null, {});
  }
};
