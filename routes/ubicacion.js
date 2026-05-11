const express = require('express');
const router = express.Router();
const ubicacionController = require('../controllers/ubicacionController');




router.get('/obtenerLocalidad', ubicacionController.obtenerLocalidades);

router.get('/obtenerProvincia', ubicacionController.obtenerProvincias);

router.get('/obtenerLocalidadesId/:id', ubicacionController.obtenerLocalidadesId);

router.get('/obtenerProvinciasId/:id', ubicacionController.obtenerProvinciasId);


module.exports = router;