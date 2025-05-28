const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const reservaViajeController = require('../controllers/reservaViajesController');
const validateReserva =  require( '../middlewares/validateReserva');
const validateUpdateReserva= require('../middlewares/validateUpdateReserva')
const validateDetalleReserva = require('../middlewares/validateDetalleReserva')


const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');



router.get('/obtenerReserva',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa','usuarioMostrador'), reservaController.obtenerReservas);

router.get('/obtenerReservaId',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente', 'usuarioEmpresa','usuarioMostrador'), reservaController.obtenerReservaPorId);
//nuevo para obtener reserva por usuario
router.get('/obtenerReservasPorUsuario',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente', 'usuarioEmpresa','usuarioMostrador'), reservaController.obtenerReservasPorUsuario);

router.post('/crearReserva',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente'),  validateReserva,validateDetalleReserva,reservaController.crearReserva);

router.put('/actualizarReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente'), validateUpdateReserva,reservaController.actualizarReserva);

router.put('/eliminarReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), reservaController.eliminarReserva);

router.put('/eliminarPasajero/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), reservaController.eliminarPasajero);

router.get('/listarPasajerosPorReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), reservaController.listarPasajerosPorReserva);

router.get('/listarPasajeros/',autenticarToken,permitirPerfiles('usuarioAdministrador'), reservaController.listarTodosLosPasajeros);

//nuevo
router.get('/listarPasajeroPorId/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), reservaController.listarPasajeroPorId);

router.get('/listarPasajeroPorViaje/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador', 'usuarioChofer'), reservaController.listarPasajerosPorViaje);

router.get('/listarReservasPorViaje/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), reservaViajeController.listarReservasPorViaje);




module.exports = router; 
