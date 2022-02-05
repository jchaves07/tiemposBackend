const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

router.post('/', usuarioController.nuevoUsuario);
router.get('/ObtenerSaldo', auth, usuarioController.ObtenerSaldo);
router.get('/userList', auth, usuarioController.ObtenerUsuarios);
router.get('/getUserMovements', auth, usuarioController.getUserMovements);
router.post('/AgregaSaldo', auth, usuarioController.AgregaSaldo);
router.post('/ObtenerSaldoByUserId', auth, usuarioController.ObtenerSaldoByUserId);



module.exports = router;