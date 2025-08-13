'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ⚠️ Cambia estos IDs a los que existan realmente en tu tabla Empresa
    const empresasIds = [1, 2, 3, 4, 5];

    const marcas = ['Mercedes-Benz', 'Volkswagen', 'Iveco', 'Scania', 'Toyota'];
    const nombres = ['Combi 111', 'Combi 125', 'Combi 101', 'Combi 230', 'Combi 221'];

    const transportes = [];

    // Para evitar nombres repetidos en la misma empresa
    const nombresUsadosPorEmpresa = {};

    let patenteCounter = 0;

    const generarPatente = () => {
      // Genera letras aleatorias
      const letras = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
      // Formato: AA999AA
      const patente = `${letras()}${letras()}${String(100 + patenteCounter).padStart(3, '0')}${letras()}${letras()}`;
      patenteCounter++;
      return patente;
    };

    // Generar 10 transportes válidos
    for (let i = 0; i < 10; i++) {
      const empresa_id = empresasIds[Math.floor(Math.random() * empresasIds.length)];
      const marca = marcas[Math.floor(Math.random() * marcas.length)];

      // Evitar nombres repetidos por empresa
      if (!nombresUsadosPorEmpresa[empresa_id]) {
        nombresUsadosPorEmpresa[empresa_id] = new Set();
      }
      let nombre;
      do {
        nombre = nombres[Math.floor(Math.random() * nombres.length)];
      } while (nombresUsadosPorEmpresa[empresa_id].has(nombre));
      nombresUsadosPorEmpresa[empresa_id].add(nombre);

      transportes.push({
        nombre,
        patente: generarPatente(),
        marca,
        cantLugares: Math.floor(Math.random() * (20 - 15 + 1)) + 15, // entre 15 y 60
        empresa_id,
        eliminado: 'no',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    return queryInterface.bulkInsert('MedioTransporte', transportes, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MedioTransporte', null, {});
  }
};
