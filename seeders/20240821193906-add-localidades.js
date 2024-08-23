'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Localidad', [
      // Departamento Capital
      { nombre: 'Corrientes', provincia_id: 7 },
      { nombre: 'Riachuelo', provincia_id: 7 },
      { nombre: 'San Cosme', provincia_id: 7 },
      { nombre: 'Paso de la Patria', provincia_id: 7 },
      
      // Departamento Goya
      { nombre: 'Goya', provincia_id: 7 },
      { nombre: 'Lavalle', provincia_id: 7 },
      { nombre: 'San Isidro', provincia_id: 7 },
      
      // Departamento Curuzú Cuatiá
      { nombre: 'Curuzú Cuatiá', provincia_id: 7 },
      { nombre: 'Cazadores Correntinos', provincia_id: 7 },
      
      // Departamento Mercedes
      { nombre: 'Mercedes', provincia_id: 7 },
      { nombre: 'Mariano I. Loza', provincia_id: 7 },

      // Departamento San Luis del Palmar
      { nombre: 'San Luis del Palmar', provincia_id: 7 },
      { nombre: 'San Cosme', provincia_id: 7 },
      { nombre: 'Paso de la Patria', provincia_id: 7 },
      { nombre: 'Santa Ana', provincia_id: 7 },
      
      // Departamento Itatí
      { nombre: 'Itatí', provincia_id: 7 },
      { nombre: 'Ramón J. Cárcano', provincia_id: 7 },
      
      // Departamento Empedrado
      { nombre: 'Empedrado', provincia_id: 7 },
      { nombre: 'El Sombrero', provincia_id: 7 },
      
      // Departamento Saladas
      { nombre: 'Saladas', provincia_id: 7 },
      { nombre: 'Santa Rosa', provincia_id: 7 },
      
      // Departamento Concepción
      { nombre: 'Concepción', provincia_id: 7 },
      { nombre: 'Santa María', provincia_id: 7 },
      
      // Departamento Mburucuyá
      { nombre: 'Mburucuyá', provincia_id: 7 },
      
      // Departamento Bella Vista
      { nombre: 'Bella Vista', provincia_id: 7 },
      { nombre: 'Tres de Abril', provincia_id: 7 },
      
      // Departamento San Roque
      { nombre: 'San Roque', provincia_id: 7 },
      { nombre: 'Pedro R. Fernández', provincia_id: 7 },

      // Departamento Esquina
      { nombre: 'Esquina', provincia_id: 7 },
      { nombre: 'Pueblo Libertador', provincia_id: 7 },

      // Departamento Sauce
      { nombre: 'Sauce', provincia_id: 7 },

      // Departamento Monte Caseros
      { nombre: 'Monte Caseros', provincia_id: 7 },
      { nombre: 'Colonia Libertad', provincia_id: 7 },
      { nombre: 'Juan Pujol', provincia_id: 7 },
      { nombre: 'Mocoretá', provincia_id: 7 },

      // Departamento Paso de los Libres
      { nombre: 'Paso de los Libres', provincia_id: 7 },
      { nombre: 'Bonpland', provincia_id: 7 },
      { nombre: 'Tapebicuá', provincia_id: 7 },
      
      // Departamento San Martín
      { nombre: 'Gobernador Virasoro', provincia_id: 7 },
      { nombre: 'Colonia Liebig', provincia_id: 7 },
      { nombre: 'San Carlos', provincia_id: 7 },
      
      // Departamento Santo Tomé
      { nombre: 'Santo Tomé', provincia_id: 7 },
      { nombre: 'Garruchos', provincia_id: 7 },
      
      // Departamento Ituzaingó
      { nombre: 'Ituzaingó', provincia_id: 7 },
      { nombre: 'Villa Olivari', provincia_id: 7 },
      
      // Departamento San Miguel
      { nombre: 'San Miguel', provincia_id: 7 },
      { nombre: 'Loreto', provincia_id: 7 },

      // Departamento Berón de Astrada
      { nombre: 'Berón de Astrada', provincia_id: 7 },
      { nombre: 'Yahapé', provincia_id: 7 },

      // Departamento General Paz
      { nombre: 'Caá Catí', provincia_id: 7 },
      { nombre: 'Lomas de Vallejos', provincia_id: 7 },
      { nombre: 'Palmar Grande', provincia_id: 7 },
      { nombre: 'Yataytí Calle', provincia_id: 7 },
      
      // Departamento Itá Ibaté
      { nombre: 'Itá Ibaté', provincia_id: 7 },
      { nombre: 'Arerunguá', provincia_id: 7 },

      // Departamento General Alvear
      { nombre: 'Alvear', provincia_id: 7 },
      { nombre: 'La Cruz', provincia_id: 7 },

      // Departamento San Cosme
      { nombre: 'San Cosme', provincia_id: 7 },
      { nombre: 'Santa Ana', provincia_id: 7 },
      { nombre: 'Paso de la Patria', provincia_id: 7 },
      { nombre: 'Ramada Paso', provincia_id: 7 },

      // Departamento San Luis del Palmar
      { nombre: 'San Luis del Palmar', provincia_id: 7 },
      { nombre: 'HerLitzka', provincia_id: 7 },

      // Departamento Lavalle
      { nombre: 'Santa Lucía', provincia_id: 7 },
      { nombre: 'Gobernador Martínez', provincia_id: 7 },

      // Departamento Saladas
      { nombre: 'Saladas', provincia_id: 7 },
      { nombre: 'Santa Rosa', provincia_id: 7 },

      // Departamento Itatí
      { nombre: 'Itatí', provincia_id: 7 },
      { nombre: 'Ramón Cárcano', provincia_id: 7 },

      // Departamento Empedrado
      { nombre: 'Empedrado', provincia_id: 7 },
      { nombre: 'El Sombrero', provincia_id: 7 },

      // Departamento San Roque
      { nombre: 'San Roque', provincia_id: 7 },
      { nombre: 'Pedro R. Fernández', provincia_id: 7 },
      { nombre: '9 de Julio', provincia_id: 7},

      // Departamento Goya
      { nombre: 'Goya', provincia_id: 7 },
      { nombre: 'Lavalle', provincia_id: 7 },

      // Departamento Curuzú Cuatiá
      { nombre: 'Curuzú Cuatiá', provincia_id: 7 },
      { nombre: 'Cazadores Correntinos', provincia_id: 7 },

      // Departamento Mercedes
      { nombre: 'Mercedes', provincia_id: 7 },
      { nombre: 'Mariano I. Loza', provincia_id: 7 },

      // Departamento Monte Caseros
      { nombre: 'Monte Caseros', provincia_id: 7 },
      { nombre: 'Colonia Libertad', provincia_id: 7 },
      { nombre: 'Juan Pujol', provincia_id: 7 },
      { nombre: 'Mocoretá', provincia_id: 7 },

      // Departamento San Martín
      { nombre: 'Gobernador Virasoro', provincia_id: 7 },
      { nombre: 'Colonia Liebig', provincia_id: 7 },
      { nombre: 'San Carlos', provincia_id: 7 },

      // Departamento Santo Tomé
      { nombre: 'Santo Tomé', provincia_id: 7 },
      { nombre: 'Garruchos', provincia_id: 7 },

      // Municipios faltantes añadilos aquí...

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Localidad', null, {});
  }
};
