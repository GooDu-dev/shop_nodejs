const express = require('express');
const router = express.Router();

const product_route = require('./products.route');
const auth_route = require('./auth.route');
const user_route = require('./user.route')

router.use('/products', product_route)
router.use('/auth', auth_route)
router.use('/users', user_route)

module.exports = router;