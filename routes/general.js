const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');
const auth = require('../middleware/auth');


router.get('/Sorteos', auth, generalController.getSorteos)
router.post('/sendmail', generalController.sendMail);
module.exports = router;