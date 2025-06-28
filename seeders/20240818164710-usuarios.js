'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const contrasenia = "Boca.12"
    const contrasenia2 = "Messi.10"
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);
    const hashedPassword2 = await bcrypt.hash(contrasenia2, saltRounds);
    await queryInterface.bulkInsert('Usuarios', [
      {
        nombre: 'Carlos',
        apellido: 'Vargas',
        dni: '12345678',
        telefono: '3794404815',
        email: 'carlos@gmail.com',
        usuario: 'Carlos',
        contrasenia: hashedPassword,
        perfil_id: 1,  
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María',
        apellido: 'Lopez',
        dni: '87654321',
        telefono: '3794414216',
        email: 'maria.gonzalez@gmail.com',
        usuario: 'messi',
        contrasenia:hashedPassword2,
        perfil_id: 2,  
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        nombre: 'Alfredo',
        apellido: 'Fernandez',
        dni: '40567911',
        telefono: '3794349011',
        email: 'alfredo@gmail.com',
        usuario: 'messi',
        contrasenia:hashedPassword2,
        perfil_id: 2,  
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        nombre: 'María',
        apellido: 'Lopez',
        dni: '87654321',
        telefono: '3794414216',
        email: 'maria.gonzalez@example.com',
        usuario: 'messi',
        contrasenia:hashedPassword2,
        perfil_id: 2,  
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        nombre: 'María',
        apellido: 'Lopez',
        dni: '87654321',
        telefono: '3794414216',
        email: 'maria.gonzalez@example.com',
        usuario: 'messi',
        contrasenia:hashedPassword2,
        perfil_id: 2,  
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
