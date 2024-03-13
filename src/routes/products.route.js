const express = require('express');
const router = express.Router();

const product_controller = require('../controller/product.controller');

// base path = '/api/products/'

router.get('/getProducts', product_controller.getAllProduct)
router.get('/getProducts/:id', product_controller.getOneProduct)


module.exports = router;