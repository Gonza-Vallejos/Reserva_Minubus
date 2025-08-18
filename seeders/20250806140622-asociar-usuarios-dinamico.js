'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const ahora = new Date();

    // Traer todos los usuarios excepto el perfil 1
    const [usuarios] = await queryInterface.sequelize.query(`
      SELECT id FROM usuarios
      WHERE perfil_id != 1
    `);

    // Lista de empresas disponibles (puedes cambiar los IDs reales)
    const empresas = [1, 2, 3, 4, 5];

    const asociaciones = usuarios.map((usuario, index) => {
      const empresaId = empresas[index % empresas.length]; // Asigna en ciclo
      return {
        id_usuario: usuario.id,
        id_empresa: empresaId,
        createdAt: ahora,
        updatedAt: ahora
      };
    });

    await queryInterface.bulkInsert('usuarioEmpresa', asociaciones, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarioEmpresa', null, {});
  }
};
