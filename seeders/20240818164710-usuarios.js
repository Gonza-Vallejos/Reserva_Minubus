'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const contrasenia = "Carlitos.1"
    const contrasenia2 = "Leomessi.1"
    const contrasenia3 = "Alfredo.1"
     const contrasenia4 = "Jorge.12"
      const contrasenia5 = "Alberto.1"
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(contrasenia, saltRounds);
    const hashedPassword2 = await bcrypt.hash(contrasenia2, saltRounds);
     const hashedPassword3 = await bcrypt.hash(contrasenia3, saltRounds);
     const hashedPassword4 = await bcrypt.hash(contrasenia4, saltRounds); 
     const hashedPassword5 = await bcrypt.hash(contrasenia5, saltRounds);  
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
        nombre: 'Leonel',
        apellido: 'Messi',
        dni: '22456111',
        telefono: '3794414210',
        email: 'leo.@gmail.com',
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
        usuario: 'alfredo',
        contrasenia:hashedPassword3,
        perfil_id: 3,  
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        nombre: 'Jorge',
        apellido: 'Lopez',
        dni: '83154321',
        telefono: '3794414221',
        email: 'jorge@example.com',
        usuario: 'jorge',
        contrasenia:hashedPassword4,
        perfil_id: 4,  
        createdAt: new Date(),
        updatedAt: new Date()
      },
       {
        nombre: 'Alberto',
        apellido: 'Rodriguez',
        dni: '45666011',
        telefono: '3794414219',
        email: 'alberto@example.com',
        usuario: 'alberto',
        contrasenia:hashedPassword5,
        perfil_id: 5,  
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
