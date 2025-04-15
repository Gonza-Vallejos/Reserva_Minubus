const express = require('express');
const router = express.Router();
const viajesController = require('../controllers/viajesController');
const validateViaje = require('../middlewares/validateViajes');
const validateUpdateViaje = require('../middlewares/validateUpdateViajes'); 
const viajesdisponibles = require('../viajes/viajesdisponibles')
const pasajerosViajes = require('../controllers/pasajerosViajesController');

const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

//  Solo cliente puede ver viajes disponibles
router.get('/viajesDisponible',
  autenticarToken,
  permitirPerfiles('usuarioCliente'),
  viajesdisponibles.obtenerViajesDisponibles
);

//  Acceso general (podés ajustarlo si querés restringir)
router.get('/obtenerViajesId/:id', autenticarToken, viajesController.obtenerViajePorId);
router.get('/obtenerViajes', autenticarToken, permitirPerfiles('usuarioMostrador', 'usuarioAdministrador'), viajesController.obtenerViajes);

//  Solo mostrador o admin pueden crear, actualizar y eliminar
router.put('/actualizarViaje/:id',
  autenticarToken,
  permitirPerfiles('usuarioMostrador', 'usuarioAdministrador'),
  validateUpdateViaje,
  viajesController.actualizarViajes
);

router.put('/eliminarViaje/:id',
  autenticarToken,
  permitirPerfiles('usuarioMostrador', 'usuarioAdministrador'),
  viajesController.eliminarViajes
);

router.post('/crearViaje',
  autenticarToken,
  permitirPerfiles('usuarioMostrador', 'usuarioAdministrador'),
  validateViaje,
  viajesController.crearViaje
);

//  Acceso general a pasajeros (ajustá si querés restricción)
router.get('/obtenerPasajerosViajesId/:id', autenticarToken, pasajerosViajes.obtenerPasajerosPorViaje);

module.exports = router;
