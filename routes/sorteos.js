const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const sorteoController = require('../controllers/sorteoController');
const auth = require('../middleware/auth');


router.post('/Agregar', auth, sorteoController.agregarSorteo);
router.post('/LimitesPorSorteo', auth, sorteoController.getLimiteSorteo);
router.post('/CompraNumeros', auth, sorteoController.CompraNumeros);
router.post('/getSorteosBySorteoID', auth, sorteoController.GetSorteosBySorteoID);
router.post('/setGanador', auth, sorteoController.SetGanador);
router.post('/GetSorteoName', auth, sorteoController.GetSorteoName);
router.post('/VentasPorNumero', auth, sorteoController.VentasPorNumero);
router.post('/changeAvalaibleNumber', auth, sorteoController.changeAvalaibleNumber);
router.post('/GetIdTicket', auth, sorteoController.GetIdTicket);
router.post('/GetNumerosDisponibles', auth, sorteoController.GetNumerosDisponibles);
router.post('/cloneTicket', auth, sorteoController.cloneTicket);
router.post('/DisableSorteo', auth, sorteoController.DisableSorteo);
router.post('/getSorteoById', auth, sorteoController.getSorteoById);
router.post('/editSorteo', auth, sorteoController.editSorteo);

module.exports = router;