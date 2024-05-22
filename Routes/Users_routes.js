const express = require('express')
const router = express.Router()
const msg = "This module to handle the request and response of user"
// Require modules
const Controllers = require('../Controllers/Users_controllers')
const validate = require('../Validation/validate')

const auth = require('../Middlewares/verify_token')

// using multer 
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req , file, cb) {
        const ext = file.mimetype.split('/')[1];
        // const fileType = file.mimetype.split('/')[0];    
    
        const fullName = "user-" + Date.now() + `.${ext}`;
        cb(null, fullName)   
    
    }
})

const filefilter = (req , file , cb) => {
    const fileType = file.mimetype.split('/')[0];
    if(fileType === "image")
    {
        return cb(null, true)
    }
    else
    {
        return cb(("This is an acceptable file type"), false)
    }
}
const upload = multer({ 
    storage: storage , 
    fileFilter: filefilter
})

router.get('/users', auth.verifyToken , Controllers.get_all_users);

router.get('/users/user/:id', Controllers.get_single_user);

router.post('/users/register', upload.single("avatar") , Controllers.register);

router.post('/users/login', Controllers.login);


module.exports = router;
module.exports.msg = msg