const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const validateReserva =  require( '../middlewares/validateReserva');

router.get('/', reservaController.obtenerReservas);
router.get('/:id', reservaController.obtenerReservaPorId);
router.post('/',  validateReserva,reservaController.crearReserva);
router.put('/:id', reservaController.actualizarReserva);
router.delete('/:id', reservaController.eliminarReserva);

module.exports = router;
