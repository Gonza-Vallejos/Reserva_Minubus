const { Pasajeros, Reserva, Viajes , MedioTransporte, UsuarioEmpresa} = require('../models');
const { Sequelize } = require('sequelize');

exports.obtenerPasajerosPorViaje = async (req, res) => {
    try {
        const pasajeros = await Pasajeros.findAll({
            attributes: ['id', 'nombre', 'apellido', 'dni', 'ubicacionOrigen', 'ubicacionDestino'],
            where: { eliminado: 'no' },
            include: [
                {
                    model: Reserva,
                    attributes: ['id'],
                    where: { viajes_id: req.params.id },
                    include: [
                        {
                            model: Viajes,
                            attributes: ['origenLocalidad', 'destinoLocalidad', 'fechaViaje', 'horarioSalida'],
                            where: { eliminado: 'no' }
                        }
                    ]
                }
            ],
            order: [
                ['id', 'ASC'],
                ['apellido', 'ASC'],
                ['nombre', 'ASC']
            ]
        });

        if (pasajeros.length === 0) {
            return res.status(404).json({ mensaje: 'No se encontraron pasajeros para el viaje solicitado.' });
        }

        const viajeData = pasajeros[0].Reserva?.Viaje || pasajeros[0].Reserva?.Viajes;

        if (!viajeData) {
            return res.status(500).json({ error: 'No se pudo obtener la información del viaje.' });
        }

        res.status(200).json({
            viaje: {
                origenLocalidad: viajeData.origenLocalidad,
                destinoLocalidad: viajeData.destinoLocalidad,
                fechaViaje: viajeData.fechaViaje,
                horarioSalida: viajeData.horarioSalida
            },
            cantidadPasajeros: pasajeros.length,
            pasajeros: pasajeros.map(p => ({
                id: p.id,
                nombre: p.nombre,
                apellido: p.apellido,
                dni: p.dni,
                ubicacionOrigen: p.ubicacionOrigen,
                ubicacionDestino: p.ubicacionDestino
            }))
        });

    } catch (error) {
        console.error('Error al obtener pasajeros del viaje:', error);
        res.status(500).json({ error: 'Error al obtener los pasajeros del viaje' });
    }
};




exports.obtenerViajesMasReservadosPorEmpresa = async (req, res) => {
 

  try {
    const viajes = await Viajes.findAll({
      attributes: [
        'id',
        'origenLocalidad',
        'destinoLocalidad',
        'fechaViaje',
        'horarioSalida',
        [Sequelize.fn('COUNT', Sequelize.col('Reservas.id')), 'cantidadReservas']
      ],
      include: [
        {
          model: Reserva,
          attributes: [],
          required: false,
          where: { eliminado: 'no' }
        },
        {
          model: UsuarioEmpresa,
          attributes: [],
          where: { id_empresa: req.params.id }
        }
      ],
      where: { eliminado: 'no' },
      group: ['Viajes.id'],
      order: [[Sequelize.literal('cantidadReservas'), 'DESC']]
    });

    const totalReservas = await Reserva.count({
      include: [
        {
          model: Viajes,
          required: true,
          where: { eliminado: 'no' },
          include: [
            {
              model: UsuarioEmpresa,
              required: true,
              where: { id_empresa: req.params.id }
            }
          ]
        }
      ],
      where: { eliminado: 'no' }
    });


    res.status(200).json({viajes, totalReservas});
  } catch (error) {
    console.error('Error al obtener viajes con más reservas:', error);
    res.status(500).json({ error: 'Error al obtener viajes con más reservas' });
  }
};


exports.obtenerViajesPorTransporteDeEmpresa = async (req, res) => {
  

  try {
    const transportesConViajes = await MedioTransporte.findAll({
      attributes: ['id', 'nombre', 'patente', 'marca'],
      where: { empresa_id: req.params.id },
      include: [
        {
          model: Viajes,
          attributes: [
            'id',
            'fechaViaje',
            'horarioSalida',
            'origenLocalidad',
            'destinoLocalidad'
          ],
          where: { eliminado: 'no' },
          required: false
        }
      ],
      order: [
        ['id', 'ASC'],
        [Viajes, 'fechaViaje', 'ASC']
      ]
    });

    // Formatear respuesta para incluir cantidad de viajes
    const resultado = transportesConViajes.map(transporte => ({
      transporteId: transporte.id,
      nombre: transporte.nombre,
      patente: transporte.patente,
      marca: transporte.marca,
      cantidadViajes: transporte.Viajes.length,
      viajes: transporte.Viajes.map(viaje => ({
        id: viaje.id,
        fechaViaje: viaje.fechaViaje,
        horarioSalida: viaje.horarioSalida,
        origen: viaje.origenLocalidad,
        destino: viaje.destinoLocalidad
      }))
    }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error('Error al obtener viajes por transporte:', error);
    res.status(500).json({ error: 'Error al obtener viajes por transporte' });
  }
};


exports.obtenerPasajerosPorEmpresa = async (req, res) => {
  try {
    const pasajeros = await Pasajeros.findAll({
      attributes: ['id', 'nombre', 'apellido', 'dni', 'ubicacionOrigen', 'ubicacionDestino'],
      where: { eliminado: 'no' },
      include: [
        {
          model: Reserva,
          attributes: ['id'],
          where: { eliminado: 'no' },
          include: [
            {
              model: Viajes,
              attributes: ['id', 'origenLocalidad', 'destinoLocalidad', 'fechaViaje', 'horarioSalida'],
              where: { eliminado: 'no' },
              include: [
                {
                  model: MedioTransporte,
                  attributes: [],
                  where: { empresa_id: req.params.id }
                }
              ]
            }
          ]
        }
      ],
      order: [
        ['apellido', 'ASC'],
        ['nombre', 'ASC']
      ]
    });

    if (pasajeros.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontraron pasajeros para la empresa solicitada.' });
    }

    const resultado = pasajeros.map(p => ({
      id: p.id,
      nombre: p.nombre,
      apellido: p.apellido,
      dni: p.dni,
      ubicacionOrigen: p.ubicacionOrigen,
      ubicacionDestino: p.ubicacionDestino,
      reserva: p.Reserva ? {
        reservaId: p.Reserva.id,
        viajeId: p.Reserva.Viaje.id,
        origenLocalidad: p.Reserva.Viaje.origenLocalidad,
        destinoLocalidad: p.Reserva.Viaje.destinoLocalidad,
        fechaViaje: p.Reserva.Viaje.fechaViaje,
        horarioSalida: p.Reserva.Viaje.horarioSalida
      } : null
    }));

    res.status(200).json({
      cantidadPasajeros: pasajeros.length,
      pasajeros: resultado
    });
  } catch (error) {
    console.error('Error al obtener pasajeros por empresa:', error);
    res.status(500).json({ error: 'Error al obtener los pasajeros por empresa' });
  }
};

