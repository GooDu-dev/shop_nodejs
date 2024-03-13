const express = require('express')
const router = express.Router()

const user_controller = require('../controller/user.controller');

router.get('/getUser/:id', user_controller.getUserById)

module.exports = router