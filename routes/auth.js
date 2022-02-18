const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');
const validateSession = require('../middleware/validateSession');

router.post('/', validateSession, authController.authUser)
router.get('/', auth, authController.UserSigned)
module.exports = router;