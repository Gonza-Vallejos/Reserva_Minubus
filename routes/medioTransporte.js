const express = require('express');
const router = express.Router();
const transporteController = require('../controllers/medio_transporteController');

router.get('/', transporteController.getAllTransporte);
router.post('/', transporteController.createTransporte);
router.delete('/:id', transporteController.deleteTransporte);

module.exports = router;