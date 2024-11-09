const express = require('express');
const router = express.Router();
const viajesController = require('../controllers/viajesController');
const validateViaje = require('../middlewares/validateViajes');
const validateUpdateViaje = require('../middlewares/validateUpdateViajes'); 
const viajesdisponibles = require('../viajes/viajesdisponibles')


router.get('/viajesDisponible', viajesdisponibles.obtenerViajesDisponibles);

router.get('/obtenerViajesId', viajesController.obtenerViajePorId);

router.get('/obtenerViajes', viajesController.obtenerViajes);

router.put('/actualizarViaje/:id', validateUpdateViaje,viajesController.actualizarViajes);

router.put('/eliminarViaje/:id', viajesController.eliminarViajes);

router.post('/crearViaje', validateViaje,viajesController.crearViaje);





module.exports = router;
