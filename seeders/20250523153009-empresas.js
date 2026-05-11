'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Empresa', [
      {
        nombre: 'Transportes Vargas S.A.',
        direccion: 'Av. Corrientes 1234',
        cuit: 20345678901,
        telefono: 1144455566,
        email: 'contacto@vargas.com',
        localidad_id: 1, // Asegurate de que esta localidad exista
        eliminado: 'no',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Vallejos Express',
        direccion: 'Calle Mitre 567',
        cuit: 20345678902,
        telefono: 1122233344,
        email: 'info@vallejos.com',
        localidad_id: 1, // Asegurate de que esta localidad exista
        eliminado: 'no',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Empresa', null, {});
  }
};