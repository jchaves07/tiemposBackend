const express = require('express');
const router = express.Router();
const generalController = require('../controllers/generalController');
const auth = require('../middleware/auth');
const validateSessionReq = require('../middleware/validateSessionReq');

router.get('/Sorteos', validateSessionReq, auth, generalController.getSorteos)
router.post('/sendmail', generalController.sendMail);
router.post('/ReporteSemanal', validateSessionReq, auth, generalController.ReporteSemanal);
router.get('/getSorteosDropdown',validateSessionReq, auth, generalController.getSorteosDropdown);
router.get('/GetWeeks', validateSessionReq, auth, generalController.GetWeeks);
router.post('/sendMailGeneral', generalController.sendMailGeneral);

module.exports = router;