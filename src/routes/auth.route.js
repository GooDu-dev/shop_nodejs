const express = require('express')
const router = express.Router();

const auth_controller = require('../controller/auth.controller')
const auth_middleware = require('../middleware/auth.middleware');

// base route : '/api/auth'

router.post('/register', auth_middleware.isNotLogin, auth_middleware.registerValidation, auth_controller.signup)
router.post('/login', auth_middleware.isNotLogin, auth_controller.login)

module.exports = router 