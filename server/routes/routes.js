const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



//----Users---//

//lager ny bruker
router.post('/users', userController.createUser);




module.exports = router;