const {
  Pasajeros,
  Reserva,
  Viajes,
  MedioTransporte,
  Usuario,
  Ventas,
  DetalleVenta,
  UsuarioEmpresa,
} = require("../models");
const { Sequelize, where } = require("sequelize");
const { Op } = require("sequelize");

exports.obtenerPasajerosPorViaje = async (req, res) => {
  try {
    const pasajeros = await Pasajeros.findAll({
      attributes: [
        "id",
        "nombre",
        "apellido",
        "dni",
        "ubicacionOrigen",
        "ubicacionDestino",
      ],
      where: { eliminado: "no" },
      include: [
        {
          model: Reserva,
          attributes: ["id"],
          where: { viajes_id: req.params.id },
          include: [
            {
              model: Viajes,
              attributes: [
                "origenLocalidad",
                "destinoLocalidad",
                "fechaViaje",
                "horarioSalida",
              ],
              where: { eliminado: "no" },
            },
          ],
        },
      ],
      order: [
        ["id", "ASC"],
        ["apellido", "ASC"],
        ["nombre", "ASC"],
      ],
    });

    if (pasajeros.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron pasajeros para el viaje solicitado.",
      });
    }

    const viajeData =
      pasajeros[0].Reserva?.Viaje || pasajeros[0].Reserva?.Viajes;

    if (!viajeData) {
      return res
        .status(500)
        .json({ error: "No se pudo obtener la información del viaje." });
    }

    res.status(200).json({
      viaje: {
        origenLocalidad: viajeData.origenLocalidad,
        destinoLocalidad: viajeData.destinoLocalidad,
        fechaViaje: viajeData.fechaViaje,
        horarioSalida: viajeData.horarioSalida,
      },
      cantidadPasajeros: pasajeros.length,
      pasajeros: pasajeros.map((p) => ({
        id: p.id,
        nombre: p.nombre,
        apellido: p.apellido,
        dni: p.dni,
        ubicacionOrigen: p.ubicacionOrigen,
        ubicacionDestino: p.ubicacionDestino,
      })),
    });
  } catch (error) {
    console.error("Error al obtener pasajeros del viaje:", error);
    res.status(500).json({ error: "Error al obtener los pasajeros del viaje" });
  }
};

exports.obtenerViajesMasReservadosPorEmpresa = async (req, res) => {
  try {
    const viajes = await Viajes.findAll({
      attributes: [
        "id",
        "origenLocalidad",
        "destinoLocalidad",
        "fechaViaje",
        "horarioSalida",
        [
          Sequelize.fn("COUNT", Sequelize.col("Reservas.id")),
          "cantidadReservas",
        ],
      ],
      include: [
        {
          model: Reserva,
          attributes: [],
          required: false,
          where: { eliminado: "no" },
        },
        {
          model: UsuarioEmpresa,
          attributes: [],
          where: { id_empresa: req.params.id },
        },
      ],
      where: { eliminado: "no" },
      group: ["Viajes.id"],
      order: [[Sequelize.literal("cantidadReservas"), "DESC"]],
    });

    const totalReservas = await Reserva.count({
      include: [
        {
          model: Viajes,
          required: true,
          where: { eliminado: "no" },
          include: [
            {
              model: UsuarioEmpresa,
              required: true,
              where: { id_empresa: req.params.id },
            },
          ],
        },
      ],
      where: { eliminado: "no" },
    });

    res.status(200).json({ viajes, totalReservas });
  } catch (error) {
    console.error("Error al obtener viajes con más reservas:", error);
    res.status(500).json({ error: "Error al obtener viajes con más reservas" });
  }
};

exports.obtenerViajesPorTransporteDeEmpresa = async (req, res) => {
  try {
    const transportesConViajes = await MedioTransporte.findAll({
      attributes: ["id", "nombre", "patente", "marca"],
      where: { empresa_id: req.params.id },
      include: [
        {
          model: Viajes,
          attributes: [
            "id",
            "fechaViaje",
            "horarioSalida",
            "origenLocalidad",
            "destinoLocalidad",
          ],
          where: { eliminado: "no" },
          required: false,
        },
      ],
      order: [
        ["id", "ASC"],
        [Viajes, "fechaViaje", "ASC"],
      ],
    });

    // Formatear respuesta para incluir cantidad de viajes
    const resultado = transportesConViajes.map((transporte) => ({
      transporteId: transporte.id,
      nombre: transporte.nombre,
      patente: transporte.patente,
      marca: transporte.marca,
      cantidadViajes: transporte.Viajes.length,
      viajes: transporte.Viajes.map((viaje) => ({
        id: viaje.id,
        fechaViaje: viaje.fechaViaje,
        horarioSalida: viaje.horarioSalida,
        origen: viaje.origenLocalidad,
        destino: viaje.destinoLocalidad,
      })),
    }));

    res.status(200).json(resultado);
  } catch (error) {
    console.error("Error al obtener viajes por transporte:", error);
    res.status(500).json({ error: "Error al obtener viajes por transporte" });
  }
};

exports.obtenerPasajerosPorEmpresa = async (req, res) => {
  try {
    const pasajeros = await Pasajeros.findAll({
      attributes: [
        "id",
        "nombre",
        "apellido",
        "dni",
        "ubicacionOrigen",
        "ubicacionDestino",
      ],
      where: { eliminado: "no" },
      include: [
        {
          model: Reserva,
          attributes: ["id"],
          where: { eliminado: "no" },
          include: [
            {
              model: Viajes,
              attributes: [
                "id",
                "origenLocalidad",
                "destinoLocalidad",
                "fechaViaje",
                "horarioSalida",
              ],
              where: { eliminado: "no" },
              include: [
                {
                  model: MedioTransporte,
                  attributes: [],
                  where: { empresa_id: req.params.id },
                },
              ],
            },
          ],
        },
      ],
      order: [
        ["apellido", "ASC"],
        ["nombre", "ASC"],
      ],
    });

    if (pasajeros.length === 0) {
      return res.status(404).json({
        mensaje: "No se encontraron pasajeros para la empresa solicitada.",
      });
    }

    const resultado = pasajeros.map((p) => ({
      id: p.id,
      nombre: p.nombre,
      apellido: p.apellido,
      dni: p.dni,
      ubicacionOrigen: p.ubicacionOrigen,
      ubicacionDestino: p.ubicacionDestino,
      reserva: p.Reserva
        ? {
            reservaId: p.Reserva.id,
            viajeId: p.Reserva.Viaje.id,
            origenLocalidad: p.Reserva.Viaje.origenLocalidad,
            destinoLocalidad: p.Reserva.Viaje.destinoLocalidad,
            fechaViaje: p.Reserva.Viaje.fechaViaje,
            horarioSalida: p.Reserva.Viaje.horarioSalida,
          }
        : null,
    }));

    res.status(200).json({
      cantidadPasajeros: pasajeros.length,
      pasajeros: resultado,
    });
  } catch (error) {
    console.error("Error al obtener pasajeros por empresa:", error);
    res
      .status(500)
      .json({ error: "Error al obtener los pasajeros por empresa" });
  }
};

///reserva Reportes
exports.obtenerClientesConMasReservasPorEmpresa = async (req, res) => {
  try {
    const topClientes = await Reserva.findAll({
      attributes: [
        "usuarios_id",
        [
          Sequelize.fn("COUNT", Sequelize.col("Reserva.id")),
          "cantidadReservas",
        ],
      ],
      include: [
        {
          model: Usuario,
          attributes: ["id", "nombre", "apellido", "email", "usuario"],
        },
        {
          model: Viajes,
          attributes: [],
          where: { eliminado: "no" },
          include: [
            {
              model: UsuarioEmpresa,
              attributes: [],
              where: { id_empresa: req.params.id },
            },
          ],
        },
      ],
      where: { eliminado: "no" },
      group: ["usuarios_id", "Usuario.id"],
      order: [[Sequelize.literal("cantidadReservas"), "DESC"]],
    });

    res.status(200).json({ topClientes });
  } catch (error) {
    console.error("Error al obtener top de clientes:", error);
    res.status(500).json({ error: "Error al obtener top de clientes" });
  }
};

///ventas Reportes
exports.obtenerClientesConVentasConfirmadasPorEmpresa = async (req, res) => {
  try {
    const topClientes = await Reserva.findAll({
      attributes: [
        "usuarios_id",
        [
          Sequelize.fn("COUNT", Sequelize.col("Reserva.id")),
          "cantidadReservas",
        ],
      ],
      include: [
        {
          model: Usuario,
          attributes: ["id", "nombre", "apellido", "email", "usuario"],
        },
        {
          model: Viajes,
          attributes: [],
          where: { eliminado: "no" },
          include: [
            {
              model: UsuarioEmpresa,
              attributes: [],
              where: { id_empresa: req.params.id },
            },
          ],
        },
        {
          model: Ventas,
          required: true,
          attributes: [],
          include: [
            {
              model: DetalleVenta,
              required: true,
              attributes: [],
            },
          ],
        },
      ],
      where: {
        eliminado: "no",
      },
      group: ["Reserva.usuarios_id"],
      order: [[Sequelize.literal("cantidadReservas"), "DESC"]],
      limit: 10,
    });

    res.status(200).json({ topClientes });
  } catch (error) {
    console.error(
      "Error al obtener top de clientes con ventas confirmadas:",
      error
    );
    res.status(500).json({
      error: "Error al obtener top de clientes con ventas confirmadas",
    });
  }
};

exports.obtenerGananciaTotalPorEmpresa = async (req, res) => {
  const idEmpresa = req.params.id;

  try {
    const viajes = await Viajes.findAll({
      attributes: [
        "id",
        "origenLocalidad",
        "destinoLocalidad",
        "fechaViaje",
        "horarioSalida",
      ],
      where: { eliminado: "no" },
      include: [
        {
          model: MedioTransporte,
          attributes: ["id", "nombre", "patente", "cantLugares"],
          where: { empresa_id: idEmpresa },
        },
        {
          model: Reserva,
          attributes: ["id", "usuarios_id"],
          where: { eliminado: "no" },
          include: [
            {
              model: Ventas,
              attributes: ["id", "fecha", "hora", "totalVentas"],
              where: { eliminado: "no" },
              include: [
                {
                  model: DetalleVenta,
                  attributes: [
                    "id",
                    "formaPago",
                    "subTotal",
                    "descuento",
                    "precioFinal",
                  ],
                  where: { eliminado: "no" },
                },
              ],
            },
          ],
        },
      ],
    });

    // Sumar el total de todas las ganancias
    let totalGanancia = 0;
    viajes.forEach((viaje) => {
      viaje.Reservas.forEach((reserva) => {
        reserva.Ventas.forEach((venta) => {
          venta.DetalleVenta.forEach((detalle) => {
            totalGanancia += detalle.precioFinal;
          });
        });
      });
    });

    res.json({ totalGanancia, viajes });
  } catch (error) {
    console.error("Error al obtener ganancia total por empresa:", error);
    res
      .status(500)
      .json({ error: "Error al obtener ganancia total por empresa" });
  }
};

exports.obtenerGananciasPorViajePorEmpresa = async (req, res) => {
  const idEmpresa = req.params.id;

  try {
    const viajes = await Viajes.findAll({
      attributes: [
        "id",
        "origenLocalidad",
        "destinoLocalidad",
        "fechaViaje",
        "precio",
        "horarioSalida",
      ],
      where: { eliminado: "no" },
      include: [
        {
          model: MedioTransporte,
          attributes: ["id", "nombre", "patente", "cantLugares", "empresa_id"],
          where: { empresa_id: idEmpresa },
        },
        {
          model: Reserva,
          attributes: ["id"],
          where: { eliminado: "no" },
          required: false,
          include: [
            {
              model: Ventas,
              attributes: ["id", "totalVentas"],
              where: { eliminado: "no" },
              required: false,
              include: [
                {
                  model: DetalleVenta,
                  attributes: ["precioFinal"],
                  where: { eliminado: "no" },
                  required: false,
                },
              ],
            },
          ],
        },
      ],
    });

    const resultados = viajes.map((viaje) => {
      let totalGanancia = 0;
      const ventas = [];

      viaje.Reservas?.forEach((reserva) => {
        reserva.Ventas?.forEach((venta) => {
          venta.DetalleVenta?.forEach((detalle) => {
            totalGanancia += detalle?.precioFinal || 0;
          });
          ventas.push({
            id: venta.id,
            totalVentas: venta.totalVentas,
          });
        });
      });

      return {
        viaje: {
          id: viaje.id,
          origenLocalidad: viaje.origenLocalidad,
          destinoLocalidad: viaje.destinoLocalidad,
          fechaViaje: viaje.fechaViaje,
          precio: viaje.precio,
          horarioSalida: viaje.horarioSalida,
          medioTransporte: viaje.MedioTransporte,
        },
        ventas,
        totalGanancia,
      };
    });

    res.json({ resultados });
  } catch (error) {
    console.error("Error al obtener ganancias por viaje por empresa:", error);
    res
      .status(500)
      .json({ error: "Error al obtener ganancias por viaje por empresa" });
  }
};

/// Reporte de usuarios con reservas sin ventas confirmadas en viajes ya realizados
exports.obtenerUsuariosConReservasSinVenta = async (req, res) => {
  try {
    const usuariosSinVenta = await Reserva.findAll({
      attributes: ["id", "usuarios_id", "viajes_id"],
      include: [
        {
          model: Usuario,
          attributes: ["id", "nombre", "apellido", "email", "usuario"],
        },
        {
          model: Viajes,
          attributes: ["fechaViaje"],
          where: {
            eliminado: "no",
            fechaViaje: { [Op.lt]: new Date() }, // Solo viajes pasados
          },
          include: [
            {
              model: UsuarioEmpresa,
              attributes: [],
              where: { id_empresa: req.params.id }, // Filtrar por empresa
            },
          ],
        },
        {
          model: Ventas,
          required: false, // LEFT JOIN
          attributes: ["id"],
        },
        {
          model: Pasajeros,
          attributes: ["nombre", "apellido", "dni"],
          where: { eliminado: "no" },
        },
      ],
      where: {
        eliminado: "no",
      },
    });

    // Filtrar reservas que NO tienen venta asociada
    const sinVentaConfirmada = usuariosSinVenta.filter((r) => !r.Venta);

    res.status(200).json({ usuariosSinVenta: sinVentaConfirmada });
  } catch (error) {
    console.error("Error al obtener usuarios con reservas sin venta:", error);
    res
      .status(500)
      .json({ error: "Error al obtener usuarios con reservas sin venta" });
  }
};
