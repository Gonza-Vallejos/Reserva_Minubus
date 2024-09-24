'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Juan',
        apellido: 'Pérez',
        dni: '12345678',
        telefono: '5551234',
        email: 'juan.perez@example.com',
        usuario: 'juanp',
        contrasenia: 'Password123.',
        perfil_id: 1,  // Asegúrate de que este ID exista en la tabla `perfils`
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María',
        apellido: 'González',
        dni: '87654321',
        telefono: '5555678',
        email: 'maria.gonzalez@example.com',
        usuario: 'mariag',
        contrasenia: 'Pssword456*',
        perfil_id: 2,  // Asegúrate de que este ID exista en la tabla `perfils`
        createdAt: new Date(),
        updatedAt: new Date()
      }
      // Agrega más usuarios si es necesario
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
