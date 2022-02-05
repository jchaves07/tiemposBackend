const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');
const auth = require('../middleware/auth');


router.get('/Sorteos', auth, generalController.getSorteos)
router.post('/sendmail', generalController.sendMail);
router.post('/ReporteSemanal', auth, generalController.ReporteSemanal);
router.get('/getSorteosDropdown', auth, generalController.getSorteosDropdown);

module.exports = router;