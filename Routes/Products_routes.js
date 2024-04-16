const express = require('express')
const router = express.Router()
const msg = "This module to handle the request and response of user"
// Require modules
const Controllers = require('../Controllers/Products_controller')
const validate = require('../Validation/validate')


router.get('/products', Controllers.get_all_products);

router.get('/products/product/:id', Controllers.get_single_product);

router.post('/products', validate.validation_schema ,  Controllers.add_new_product);

router.patch("/products/product/:id" , Controllers.update_product )

router.delete('/products/product/:id', Controllers.delete_product);

module.exports = router;
module.exports.msg = msg