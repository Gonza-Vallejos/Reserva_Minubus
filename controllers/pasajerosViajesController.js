const { Reserva, Viajes, Pasajeros } = require("../models");
const viajesController = require("../controllers/viajesController");

// Obtener pasajeros por viaje
exports.obtenerPasajerosPorViaje = async (req, res) => {
  try {
    const viajeCompleto = await viajesController.obtenerViajeId(req.params.id);
    if (!viajeCompleto) {
      return res.status(404).json({ mensaje: "Viaje no encontrado" });
    }

    const { id, medioTransporte_id, ...viaje } = viajeCompleto.toJSON();

    const reservas = await Reserva.findAll({
      where: { viajes_id: req.params.id },
      attributes: ["id", "fechaReserva"],
    });

    const reservasIds = reservas.map((r) => r.id);
    if (reservasIds.length === 0) {
      return res.status(200).json([]);
    }

    const pasajeros = await Pasajeros.findAll({
      where: { reserva_id: reservasIds },
      attributes: [
        "id",
        "nombre",
        "apellido",
        "dni",
        "ubicacionOrigen",
        "ubicacionDestino",
        "reserva_id",
      ],
    });

    const plano = pasajeros.map((p) => {
      const reserva = reservas.find((r) => r.id === p.reserva_id);
      return {
        ...viaje,
        fechaReserva: reserva ? reserva.fechaReserva : null,
        id: p.id,
        nombre: p.nombre,
        apellido: p.apellido,
        dni: p.dni,
        ubicacionOrigen: p.ubicacionOrigen,
        ubicacionDestino: p.ubicacionDestino,
      };
    });

    res.status(200).json(plano);
  } catch (error) {
    console.error("Error al obtener pasajeros :", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
