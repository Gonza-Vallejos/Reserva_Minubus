const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');


const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.get('/obtenerPasajerosPorViaje/:id', reportesController.obtenerPasajerosPorViaje);

router.get('/obtenerViajesMasReservadosPorEmpresa/:id', reportesController.obtenerViajesMasReservadosPorEmpresa);

router.get('/obtenerViajesPorTransporteDeEmpresa/:id', reportesController.obtenerViajesPorTransporteDeEmpresa);


router.get('/obtenerPasajerosPorEmpresa/:id', reportesController.obtenerPasajerosPorEmpresa);

router.get('/obtenerClientesConMasReservasPorEmpresa/:id', reportesController.obtenerClientesConMasReservasPorEmpresa);


router.get('/obtenerClientesConVentasConfirmadasPorEmpresa/:id', reportesController.obtenerClientesConVentasConfirmadasPorEmpresa);


router.get('/obtenerGananciaTotalPorEmpresa/:id', reportesController.obtenerGananciaTotalPorEmpresa);

router.get('/obtenerGananciasPorViajePorEmpresa/:id', reportesController.obtenerGananciasPorViajePorEmpresa);




module.exports = router;