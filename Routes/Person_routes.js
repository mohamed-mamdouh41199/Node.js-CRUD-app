const express = require('express')
const router = express.Router()
const msg = "This module to handle the request and response of user"
// Require modules
const Controllers = require('../Controllers/Preson_controller')
const validate = require('../Validation/validate')
const auth = require('../Middlewares/verify_token')
const userRoles = require('../utilities/user_roles')
const accessUser = require('../Middlewares/allowed_To')

// router.get('/products', auth.verifyToken ,Controllers.get_all_products);

router.get('/persons' , Controllers.get_all_persons);

// router.get('/products/product/:id', auth.verifyToken ,  Controllers.get_single_product);

router.post('/person', validate.validation_schema ,  Controllers.add_new_person);

router.patch("/persons/person/:id" , Controllers.update_person )

router.delete('/persons/person/:id' , Controllers.delete_person);

module.exports = router;
module.exports.msg = msg