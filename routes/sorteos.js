const express = require('express');
const router = express.Router();
const sorteoController = require('../controllers/sorteoController');
const auth = require('../middleware/auth');


router.post('/Agregar', auth, sorteoController.agregarSorteo);
router.post('/LimitesPorSorteo', auth, sorteoController.getLimiteSorteo);
module.exports = router;