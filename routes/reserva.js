const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const validateReserva =  require( '../middlewares/validateReserva');

router.get('/', reservaController.getAllReservas);
router.get('/:id', reservaController.getReservaById);
router.post('/',  validateReserva,reservaController.createReserva);
router.put('/:id', reservaController.updateReserva);
router.delete('/:id', reservaController.deleteReserva);

module.exports = router;
