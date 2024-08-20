const express = require('express');
const router = express.Router();
const viajesController = require('../controllers/viajesController');

router.get('/', viajesController.getViajes);
router.get('/:id', viajesController.getViajesById);
router.post('/', viajesController.createViajes);
router.put('/:id', viajesController.updateViajes);
router.delete('/:id', viajesController.deleteViajes);

module.exports = router;
