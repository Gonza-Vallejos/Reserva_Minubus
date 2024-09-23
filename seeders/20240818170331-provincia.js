'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Provincia', [
      { id: 1, nombre: 'Buenos Aires', createdAt: new Date(), updatedAt: new Date() },
      { id: 2, nombre: 'Catamarca', createdAt: new Date(), updatedAt: new Date() },
      { id: 3, nombre: 'Chaco', createdAt: new Date(), updatedAt: new Date() },
      { id: 4, nombre: 'Chubut', createdAt: new Date(), updatedAt: new Date() },
      { id: 5, nombre: 'CABA', createdAt: new Date(), updatedAt: new Date() },
      { id: 6, nombre: 'Córdoba', createdAt: new Date(), updatedAt: new Date() },
      { id: 7, nombre: 'Corrientes', createdAt: new Date(), updatedAt: new Date() },
      { id: 8, nombre: 'Entre Ríos', createdAt: new Date(), updatedAt: new Date() },
      { id: 9, nombre: 'Formosa', createdAt: new Date(), updatedAt: new Date() },
      { id: 10, nombre: 'Jujuy', createdAt: new Date(), updatedAt: new Date() },
      { id: 11, nombre: 'La Pampa', createdAt: new Date(), updatedAt: new Date() },
      { id: 12, nombre: 'La Rioja', createdAt: new Date(), updatedAt: new Date() },
      { id: 13, nombre: 'Mendoza', createdAt: new Date(), updatedAt: new Date() },
      { id: 14, nombre: 'Misiones', createdAt: new Date(), updatedAt: new Date() },
      { id: 15, nombre: 'Neuquén', createdAt: new Date(), updatedAt: new Date() },
      { id: 16, nombre: 'Río Negro', createdAt: new Date(), updatedAt: new Date() },
      { id: 17, nombre: 'Salta', createdAt: new Date(), updatedAt: new Date() },
      { id: 18, nombre: 'San Juan', createdAt: new Date(), updatedAt: new Date() },
      { id: 19, nombre: 'San Luis', createdAt: new Date(), updatedAt: new Date() },
      { id: 20, nombre: 'Santa Cruz', createdAt: new Date(), updatedAt: new Date() },
      { id: 21, nombre: 'Santa Fe', createdAt: new Date(), updatedAt: new Date() },
      { id: 22, nombre: 'Santiago del Estero', createdAt: new Date(), updatedAt: new Date() },
      { id: 23, nombre: 'Tierra del Fuego', createdAt: new Date(), updatedAt: new Date() },
      { id: 24, nombre: 'Tucumán', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Provincia', null, {});
  }
};
