const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const sorteoController = require('../controllers/sorteoController');
const auth = require('../middleware/auth');
const validateSessionReq = require('../middleware/validateSessionReq');

router.post('/Agregar', validateSessionReq, auth, sorteoController.agregarSorteo);
router.post('/LimitesPorSorteo', validateSessionReq, auth, sorteoController.getLimiteSorteo);
router.post('/CompraNumeros', validateSessionReq, auth, sorteoController.CompraNumeros);
router.post('/getSorteosBySorteoID', validateSessionReq, auth, sorteoController.GetSorteosBySorteoID);
router.post('/setGanador', validateSessionReq, auth, sorteoController.SetGanador);
router.post('/GetSorteoName', validateSessionReq, auth, sorteoController.GetSorteoName);
router.post('/VentasPorNumero', validateSessionReq, auth, sorteoController.VentasPorNumero);
router.post('/changeAvalaibleNumber', validateSessionReq, auth, sorteoController.changeAvalaibleNumber);
router.post('/GetIdTicket', validateSessionReq, auth, sorteoController.GetIdTicket);
router.post('/GetNumerosDisponibles', validateSessionReq, auth, sorteoController.GetNumerosDisponibles);
router.post('/cloneTicket', validateSessionReq, auth, sorteoController.cloneTicket);
router.post('/DisableSorteo', validateSessionReq, auth, sorteoController.DisableSorteo);
router.post('/getSorteoById', validateSessionReq, auth, sorteoController.getSorteoById);
router.post('/editSorteo', validateSessionReq, auth, sorteoController.editSorteo);

module.exports = router;