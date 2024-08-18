'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: '12345678',
        telefono: '555-1234',
        email: 'juan.perez@example.com',
        usuario: 'juanp',
        contraseña: 'password123',
        perfil_id: 1,  // Asegúrate de que este ID exista en la tabla `perfils`
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María',
        apellido: 'González',
        dni: '87654321',
        telefono: '555-5678',
        email: 'maria.gonzalez@example.com',
        usuario: 'mariag',
        contraseña: 'password456',
        perfil_id: 2,  // Asegúrate de que este ID exista en la tabla `perfils`
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Agrega más usuarios si es necesario
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', null, {});
  }
};
