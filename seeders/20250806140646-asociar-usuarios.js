'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ahora = new Date();

    const asociaciones = [
      // Empresa 1
      { id_usuario: 13, id_empresa: 1, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 14, id_empresa: 1, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 15, id_empresa: 1, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 16, id_empresa: 1, createdAt: ahora, updatedAt: ahora },

      // Empresa 2
      { id_usuario: 17, id_empresa: 2, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 18, id_empresa: 2, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 19, id_empresa: 2, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 20, id_empresa: 2, createdAt: ahora, updatedAt: ahora },

      // Empresa 3
      { id_usuario: 21, id_empresa: 3, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 22, id_empresa: 3, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 23, id_empresa: 3, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 24, id_empresa: 3, createdAt: ahora, updatedAt: ahora },

      // Empresa 4
      { id_usuario: 25, id_empresa: 4, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 26, id_empresa: 4, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 27, id_empresa: 4, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 28, id_empresa: 4, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 29, id_empresa: 4, createdAt: ahora, updatedAt: ahora },

      // Empresa 5
      { id_usuario: 30, id_empresa: 5, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 31, id_empresa: 5, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 32, id_empresa: 5, createdAt: ahora, updatedAt: ahora },
      { id_usuario: 33, id_empresa: 5, createdAt: ahora, updatedAt: ahora },
      
    ];

    await queryInterface.bulkInsert('usuarioEmpresa', asociaciones, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarioEmpresa', null, {});
  }
};
