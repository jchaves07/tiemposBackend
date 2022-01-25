const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');

router.post('/', usuarioController.nuevoUsuario);
router.get('/ObtenerSaldo', auth, usuarioController.ObtenerSaldo);
router.get('/userList', auth, usuarioController.ObtenerUsuarios);
module.exports = router;