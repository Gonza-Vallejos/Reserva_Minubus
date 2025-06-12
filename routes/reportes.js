const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');


const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.get('/obtenerPasajerosPorViaje/:id', reportesController.obtenerPasajerosPorViaje);

router.get('/obtenerViajesMasReservadosPorEmpresa/:id', reportesController.obtenerViajesMasReservadosPorEmpresa);

router.get('/obtenerViajesPorTransporteDeEmpresa/:id', reportesController.obtenerViajesPorTransporteDeEmpresa);


router.get('/obtenerPasajerosPorEmpresa/:id', reportesController.obtenerPasajerosPorEmpresa);


module.exports = router;