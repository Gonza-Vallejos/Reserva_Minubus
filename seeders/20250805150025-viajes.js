// seeders/20250806-viajes.js
'use strict';

const localidades = [
  "Corrientes","Riachuelo","San Cosme","Paso de la Patria","Goya","Lavalle","San Isidro",
  "Curuzú Cuatiá","Cazadores Correntinos","Mercedes","Mariano I. Loza","San Luis del Palmar",
  "Santa Ana","Itatí","Ramón J. Cárcano","Empedrado","El Sombrero","Saladas","Santa Rosa",
  "Concepción","Santa María","Mburucuyá","Bella Vista","Tres de Abril","San Roque",
  "Pedro R. Fernández","Esquina","Pueblo Libertador","Sauce","Monte Caseros","Colonia Libertad",
  "Juan Pujol","Mocoretá","Paso de los Libres","Bonpland","Tapebicuá","Gobernador Virasoro",
  "Colonia Liebig","San Carlos","Santo Tomé","Garruchos","Ituzaingó","Villa Olivari",
  "San Miguel","Loreto","Berón de Astrada","Yahapé","Caá Catí","Lomas de Vallejos",
  "Palmar Grande","Yataytí Calle","Itá Ibaté","Arerunguá","Alvear","La Cruz",
  "Ramada Paso"
];

function localidadAleatoria(excluir) {
  let random;
  do {
    random = localidades[Math.floor(Math.random() * localidades.length)];
  } while (random === excluir);
  return random;
}

module.exports = {
  async up (queryInterface, Sequelize) {
    const viajes = [];
    const usuarioEmpresaIds = [44, 45, 46, 47];

    // Transportes por empresa_id con su cantLugares
    const transportesPorEmpresa = {
      1: [
        { id: 1,  cantLugares: 15 },
        { id: 8,  cantLugares: 16 },
        { id: 9,  cantLugares: 19 },
        { id: 12, cantLugares: 16 },
        { id: 15, cantLugares: 15 },
        { id: 16, cantLugares: 17 },
        { id: 21, cantLugares: 17 }
      ],
      2: [
        { id: 3, cantLugares: 15 },
        { id: 4, cantLugares: 13 },
        { id: 10, cantLugares: 18 },
        { id: 11, cantLugares: 18 }
      ],
      3: [
        { id: 5,  cantLugares: 15 },
        { id: 6,  cantLugares: 15 },
        { id: 17, cantLugares: 20 },
        { id: 18, cantLugares: 19 },
        { id: 19, cantLugares: 16 }
      ],
      4: [
        { id: 13, cantLugares: 19 },
        { id: 14, cantLugares: 19 },
        { id: 22, cantLugares: 19 }
      ],
      5: [
        { id: 20, cantLugares: 20 }
      ],
      6: [] // Sin transportes
    };

    // Relación usuarioEmpresa_id → empresa_id
    const empresaPorUsuarioEmpresa = {
      44: 5,
      45: 4,
      46: 6,
      47: 3
    };

    usuarioEmpresaIds.forEach((usuarioEmpresaId) => {
      const empresaId = empresaPorUsuarioEmpresa[usuarioEmpresaId];
      const transportes = transportesPorEmpresa[empresaId];

      for (let i = 0; i < 3; i++) { // 3 viajes por chofer
        const origen = localidadAleatoria();
        const destino = localidadAleatoria(origen);

        // Elegir transporte aleatorio de la empresa
        const transporte = transportes[Math.floor(Math.random() * transportes.length)];

        viajes.push({
          origenLocalidad: origen,
          destinoLocalidad: destino,
          horarioSalida: `${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:00:00`,
          fechaViaje: new Date(2025, 7, Math.floor(Math.random() * 28) + 1), // agosto 2025
          precio: (Math.floor(Math.random() * 5000) + 1000).toFixed(2),
          cantPasajeros: transporte.cantLugares,
          usuarioEmpresa_id: usuarioEmpresaId,
          medioTransporte_id: transporte.id,
          createdAt: new Date(),
          updatedAt: new Date()
        });
      }
    });

    await queryInterface.bulkInsert('viajes', viajes, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('viajes', null, {});
  }
};
