const express = require('express');
const router = express.Router();
const viajesController = require('../controllers/viajesController');
const validateViaje = require('../middlewares/validateViajes');
const validateUpdateViaje = require('../middlewares/validateUpdateViajes'); 

router.get('/', viajesController.obtenerViajes);

router.get('/:id', viajesController.obtenerViajePorId);

router.post('/', validateViaje,viajesController.crearViaje);

router.put('/:id', validateUpdateViaje,viajesController.actualizarViajes);

router.patch('/:id', viajesController.eliminarViajes);

module.exports = router;
