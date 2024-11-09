const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const validateReserva =  require( '../middlewares/validateReserva');
const validateUpdateReserva= require('../middlewares/validateUpdateReserva')

router.get('/obtenerReserva', reservaController.obtenerReservas);

router.get('/obtenerReservaId', reservaController.obtenerReservaPorId);

router.post('/crearReserva',  validateReserva,reservaController.crearReserva);

router.put('/actualizarReserva/:id', validateUpdateReserva,reservaController.actualizarReserva);

router.put('/eliminarReserva/:id', reservaController.eliminarReserva);


module.exports = router;
