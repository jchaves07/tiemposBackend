const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const auth = require('../middleware/auth');
const validateSessionReq = require('../middleware/validateSessionReq');

router.post('/', usuarioController.nuevoUsuario);
router.get('/ObtenerSaldo', validateSessionReq, auth, usuarioController.ObtenerSaldo);
router.get('/userList', validateSessionReq, auth, usuarioController.ObtenerUsuarios);
router.get('/getUserMovements', validateSessionReq, auth, usuarioController.getUserMovements);
router.post('/AgregaSaldo', validateSessionReq, auth, usuarioController.AgregaSaldo);
router.post('/ObtenerSaldoByUserId', validateSessionReq, auth, usuarioController.ObtenerSaldoByUserId);
router.post('/jerarquiaUsuarioParent', validateSessionReq, auth, usuarioController.jerarquiaUsuarioParent);
router.post('/jerarquiaUsuarioByAgentParent', validateSessionReq, auth, usuarioController.jerarquiaUsuarioByAgentParent);
router.post('/getUserMovementsByDateAndUser', validateSessionReq, auth, usuarioController.getUserMovementsByDateAndUser);
router.post('/ObtenerUsuario', validateSessionReq, auth, usuarioController.ObtenerUsuario);
router.post('/cambiarpass', validateSessionReq, auth, usuarioController.cambiarpass);
//

module.exports = router;