const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const validateReserva =  require( '../middlewares/validateReserva');
const validateUpdateReserva= require('../middlewares/validateUpdateReserva')

router.get('/', reservaController.obtenerReservas);

router.get('/:id', reservaController.obtenerReservaPorId);

router.post('/',  validateReserva,reservaController.crearReserva);

router.put('/:id', validateUpdateReserva,reservaController.actualizarReserva);

router.patch('/:id', reservaController.eliminarReserva);

module.exports = router;
