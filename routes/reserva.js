const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const reservaViajeController = require('../controllers/reservaViajesController');
const validateReserva =  require( '../middlewares/validateReserva');
const validateUpdateReserva= require('../middlewares/validateUpdateReserva')
const validateDetalleReserva = require('../middlewares/validateDetalleReserva')
const validatePasajero= require('../middlewares/validatePasajero')
const validateUpdatePasajero= require('../middlewares/validarUpdatePasajero')


const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');



router.get('/obtenerReserva',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa','usuarioMostrador'), reservaController.obtenerReservas);

router.get('/obtenerReservaId',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente', 'usuarioEmpresa','usuarioMostrador'), reservaController.obtenerReservaPorId);
//nuevo para obtener reserva por usuario
router.get('/obtenerReservasPorUsuario',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente', 'usuarioEmpresa','usuarioMostrador'), reservaController.obtenerReservasPorUsuario);

router.post('/crearReserva',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente'),  validateReserva,validatePasajero, reservaController.crearReserva);

router.put('/actualizarReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente'),validateUpdatePasajero, reservaController.actualizarReserva);

router.put('/eliminarReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador', 'usuarioCliente'), reservaController.eliminarReserva);

router.put('/eliminarPasajero/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador', 'usuarioCliente', 'usuarioChofer'), reservaController.eliminarPasajero);

router.get('/listarPasajerosPorReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador','usuarioCliente'), reservaController.listarPasajerosPorReserva);

router.get('/listarPasajeros/',autenticarToken,permitirPerfiles('usuarioAdministrador'), reservaController.listarTodosLosPasajeros);

router.get('/listarPasajeroPorId/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador','usuarioCliente'), reservaController.listarPasajeroPorId);

router.get('/listarPasajeroPorViaje/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador', 'usuarioChofer'), reservaController.listarPasajerosPorViaje);

router.get('/listarReservasPorViaje/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador', 'usuarioEmpresa'), reservaViajeController.listarReservasPorViaje);

router.get('/obtenerReservasPorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador','usuarioEmpresa'), reservaController.obtenerReservasPorEmpresa);

router.get('/listarReservasYPasajerosPorViaje/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador', 'usuarioChofer'), reservaController.listarReservasYPasajerosPorViaje);


module.exports = router; 
