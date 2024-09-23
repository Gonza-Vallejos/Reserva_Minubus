'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Localidad', [
      // Departamento Capital
      { nombre: 'Corrientes', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Riachuelo', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'San Cosme', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Paso de la Patria', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Goya
      { nombre: 'Goya', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Lavalle', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'San Isidro', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Curuzú Cuatiá
      { nombre: 'Curuzú Cuatiá', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Cazadores Correntinos', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Mercedes
      { nombre: 'Mercedes', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Mariano I. Loza', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento San Luis del Palmar
      { nombre: 'San Luis del Palmar', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'San Cosme', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Paso de la Patria', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Santa Ana', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Itatí
      { nombre: 'Itatí', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ramón J. Cárcano', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Empedrado
      { nombre: 'Empedrado', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'El Sombrero', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Saladas
      { nombre: 'Saladas', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Santa Rosa', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Concepción
      { nombre: 'Concepción', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Santa María', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Mburucuyá
      { nombre: 'Mburucuyá', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Bella Vista
      { nombre: 'Bella Vista', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Tres de Abril', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento San Roque
      { nombre: 'San Roque', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pedro R. Fernández', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento Esquina
      { nombre: 'Esquina', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Pueblo Libertador', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento Sauce
      { nombre: 'Sauce', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento Monte Caseros
      { nombre: 'Monte Caseros', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Colonia Libertad', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Juan Pujol', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Mocoretá', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento Paso de los Libres
      { nombre: 'Paso de los Libres', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Bonpland', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Tapebicuá', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento San Martín
      { nombre: 'Gobernador Virasoro', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Colonia Liebig', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'San Carlos', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Santo Tomé
      { nombre: 'Santo Tomé', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Garruchos', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Ituzaingó
      { nombre: 'Ituzaingó', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Villa Olivari', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento San Miguel
      { nombre: 'San Miguel', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Loreto', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento Berón de Astrada
      { nombre: 'Berón de Astrada', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Yahapé', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento General Paz
      { nombre: 'Caá Catí', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Lomas de Vallejos', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Palmar Grande', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Yataytí Calle', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      
      // Departamento Itá Ibaté
      { nombre: 'Itá Ibaté', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Arerunguá', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento General Alvear
      { nombre: 'Alvear', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'La Cruz', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Departamento San Cosme
      { nombre: 'San Cosme', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Santa Ana', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Paso de la Patria', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ramada Paso', provincia_id: 7, createdAt: new Date(), updatedAt: new Date() },

      // Municipios faltantes añadilos aquí...

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Localidad', null, {});
  }
};
