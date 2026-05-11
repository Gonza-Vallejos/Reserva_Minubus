'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  async up(queryInterface, Sequelize) {
    const saltRounds = 10;
    const makePassword = async (name) => {
      return await bcrypt.hash(`${name}.1`, saltRounds);
    };

    const usuarios = [
      // Perfil 2
      ['Martina', 'Lopez', 10112233, '3794500101', 'martina.lopez@example.com', 'martinaL', 2],
      ['Gabriel', 'Ortiz', 10112234, '3794500102', 'gabriel.ortiz@example.com', 'gabrielO', 2],
      ['Julieta', 'Sosa', 10112235, '3794500103', 'julieta.sosa@example.com', 'julietaS', 2],
      ['Pablo', 'Mendez', 10112236, '3794500104', 'pablo.mendez@example.com', 'pabloM', 2],
      ['Agustin', 'Vega', 10112237, '3794500105', 'agustin.vega@example.com', 'agustinV', 2],

      // Perfil 3
      ['Camila', 'Herrera', 10112238, '3794500106', 'camila.herrera@example.com', 'camilaH', 3],
      ['Lucas', 'Martinez', 10112239, '3794500107', 'lucas.martinez@example.com', 'lucasM', 3],
      ['Florencia', 'Rios', 10112240, '3794500108', 'florencia.rios@example.com', 'florenciaR', 3],
      ['Sebastian', 'Diaz', 10112241, '3794500109', 'sebastian.diaz@example.com', 'sebastianD', 3],
      ['Maria', 'Suarez', 10112242, '3794500110', 'maria.suarez@example.com', 'mariaS', 3],

      // Perfil 4
      ['Nicolas', 'Gomez', 10112243, '3794500111', 'nicolas.gomez@example.com', 'nicolasG', 4],
      ['Cecilia', 'Benitez', 10112244, '3794500112', 'cecilia.benitez@example.com', 'ceciliaB', 4],
      ['Bruno', 'Alonso', 10112245, '3794500113', 'bruno.alonso@example.com', 'brunoA', 4],
      ['Emilia', 'Cruz', 10112246, '3794500114', 'emilia.cruz@example.com', 'emiliaC', 4],
      ['Federico', 'Morales', 10112247, '3794500115','federico.morales@example.com', 'federicoM', 4],

      // Perfil 5
      ['Daniela', 'Ponce', 10112248, '3794500116', 'daniela.ponce@example.com', 'danielaP', 5],
      ['Rodrigo', 'Campos', 10112249, '3794500117', 'rodrigo.campos@example.com', 'rodrigoC', 5],
      ['Paula', 'Vargas', 10112250, '3794500118', 'paula.vargas@example.com', 'paulaV', 5],
      ['Maximiliano', 'Acosta', 10112251, '3794500119', 'maximiliano.acosta@example.com', 'maximilianoA', 5],
      ['Carolina', 'Navarro', 10112252, '3794500120', 'carolina.navarro@example.com', 'carolinaN', 5]
    ];

    const usuariosConHash = [];
    for (const u of usuarios) {
      usuariosConHash.push({
        nombre: u[0],
        apellido: u[1],
        dni: u[2],
        telefono: u[3],
        email: u[4],
        usuario: u[5],
        contrasenia: await makePassword(u[0]),
        perfil_id: u[6],
        verificado: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('usuarios', usuariosConHash, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('usuarios', {
      email: [
        'martina.lopez@example.com', 'gabriel.ortiz@example.com', 'julieta.sosa@example.com',
        'pablo.mendez@example.com', 'agustin.vega@example.com', 'camila.herrera@example.com',
        'lucas.martinez@example.com', 'florencia.rios@example.com', 'sebastian.diaz@example.com',
        'maria.suarez@example.com', 'nicolas.gomez@example.com', 'cecilia.benitez@example.com',
        'bruno.alonso@example.com', 'emilia.cruz@example.com', 'federico.morales@example.com',
        'daniela.ponce@example.com', 'rodrigo.campos@example.com', 'paula.vargas@example.com',
        'maximiliano.acosta@example.com', 'carolina.navarro@example.com'
      ]
    }, {});
  }
};
