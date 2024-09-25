const express = require('express');
const router = express.Router();
const viajesController = require('../controllers/viajesController');

router.get('/', viajesController.obtenerViajes);

router.get('/:id', viajesController.obtenerViajePorId);

router.post('/', viajesController.crearViaje);

router.put('/:id', viajesController.actualizarViajes);

router.patch('/:id', viajesController.eliminarViajes);

module.exports = router;
