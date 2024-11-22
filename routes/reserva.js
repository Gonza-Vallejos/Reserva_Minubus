const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const validateReserva =  require( '../middlewares/validateReserva');
const validateUpdateReserva= require('../middlewares/validateUpdateReserva')
const validateDetalleReserva = require('../middlewares/validateDetalleReserva')

router.get('/obtenerReserva', reservaController.obtenerReservas);

router.get('/obtenerReservaId', reservaController.obtenerReservaPorId);

router.post('/crearReserva',  validateReserva,validateDetalleReserva,reservaController.crearReserva);

router.put('/actualizarReserva/:id', validateUpdateReserva,reservaController.actualizarReserva);

router.put('/eliminarReserva/:id', reservaController.eliminarReserva);


module.exports = router; 
