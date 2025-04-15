const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const validateReserva =  require( '../middlewares/validateReserva');
const validateUpdateReserva= require('../middlewares/validateUpdateReserva')
const validateDetalleReserva = require('../middlewares/validateDetalleReserva')


const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.get('/obtenerReserva',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente', 'usuarioEmpresa','usuarioMostrador'), reservaController.obtenerReservas);

router.get('/obtenerReservaId',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente', 'usuarioEmpresa','usuarioMostrador'), reservaController.obtenerReservaPorId);

router.post('/crearReserva',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente'),  validateReserva,validateDetalleReserva,reservaController.crearReserva);

router.put('/actualizarReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente'), validateUpdateReserva,reservaController.actualizarReserva);

router.put('/eliminarReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioCliente', 'usuarioMostrador'), reservaController.eliminarReserva);

router.put('/eliminarPasajero/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), reservaController.eliminarPasajero);

router.get('/listarPasajerosPorReserva/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador'), reservaController.listarPasajerosPorReserva);

router.get('/listarPasajeros/',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioMostrador '), reservaController.listarTodosLosPasajeros);





module.exports = router; 
