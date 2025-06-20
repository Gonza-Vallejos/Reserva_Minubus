const express = require('express');
const router = express.Router();
const reportesController = require('../controllers/reportesController');


const { autenticarToken, permitirPerfiles } = require('../middlewares/authMiddleware');

router.get('/obtenerPasajerosPorViaje/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), reportesController.obtenerPasajerosPorViaje);

router.get('/obtenerViajesMasReservadosPorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), reportesController.obtenerViajesMasReservadosPorEmpresa);

router.get('/obtenerViajesPorTransporteDeEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), reportesController.obtenerViajesPorTransporteDeEmpresa);


router.get('/obtenerPasajerosPorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), reportesController.obtenerPasajerosPorEmpresa);

router.get('/obtenerClientesConMasReservasPorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), reportesController.obtenerClientesConMasReservasPorEmpresa);


router.get('/obtenerClientesConVentasConfirmadasPorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), reportesController.obtenerClientesConVentasConfirmadasPorEmpresa);


router.get('/obtenerGananciaTotalPorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), reportesController.obtenerGananciaTotalPorEmpresa);

router.get('/obtenerGananciasPorViajePorEmpresa/:id',autenticarToken,permitirPerfiles('usuarioAdministrador', 'usuarioEmpresa'), reportesController.obtenerGananciasPorViajePorEmpresa);




module.exports = router;