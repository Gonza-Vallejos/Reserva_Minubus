const express = require('express');
const router = express.Router();
const viajesController = require('../controllers/viajesController');
const validateViaje = require('../middlewares/validateViajes');
const validateUpdateViaje = require('../middlewares/validateUpdateViajes'); 
const viajesdisponibles = require('../viajes/viajesdisponibles')
const pasajerosViajes = require('../controllers/pasajerosViajesController');

const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

//  Solo cliente puede ver viajes disponibles
router.get('/viajesDisponible', autenticarToken,permitirPerfiles('usuarioCliente', 'usuarioEmpresa', 'usuarioCliente'),viajesdisponibles.obtenerViajesDisponibles);

router.get('/obtenerViajesId/:id', autenticarToken ,permitirPerfiles('usuarioMostrador', 'usuarioAdministrador','usuarioEmpresa '), viajesController.obtenerViajePorId);

router.get('/obtenerViajes', autenticarToken, permitirPerfiles('usuarioMostrador', 'usuarioAdministrador','usuarioEmpresa '), viajesController.obtenerViajes);

router.put('/actualizarViaje/:id',autenticarToken,permitirPerfiles('usuarioMostrador', 'usuarioAdministrador'),validateUpdateViaje,viajesController.actualizarViajes);

router.put('/eliminarViaje/:id',autenticarToken,permitirPerfiles('usuarioMostrador', 'usuarioAdministrador'),viajesController.eliminarViajes);

router.post('/crearViaje',autenticarToken,permitirPerfiles('usuarioMostrador', 'usuarioAdministrador'),validateViaje,viajesController.crearViaje);

router.get('/obtenerPasajerosViajesId/:id', autenticarToken ,permitirPerfiles('usuarioMostrador', 'usuarioAdministrador','usuarioEmpresa', 'usuarioChofer'), pasajerosViajes.obtenerPasajerosPorViaje);

module.exports = router;

