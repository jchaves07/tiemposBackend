const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');
const auth = require('../middleware/auth');


router.get('/Sorteos', auth, generalController.getSorteos)
module.exports = router;