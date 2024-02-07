const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

//----Users---//

//lager ny bruker
router.post('/users', userController.createUser);

//får en json fil med alle brukerene
router.get('/users', userController.getAllUsers); 

//henter et bruker objekt med ID
router.get('/users/:id', userController.getUserByID); 


//Fungerer ikke. Tror d har noe med access til database??
// //Oppdaterer den spesifikke brukeren
// router.put('users/:id', userController.updateUser);

// //Sletter en bruker med ID
// router.delete('users/:id', userController.deleteUser)

module.exports = router;