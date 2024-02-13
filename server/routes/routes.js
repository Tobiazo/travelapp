const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const destinationController = require('../controllers/destinationController')

//----Users---//

//lager ny bruker
router.post('/users', userController.createUser);

//får en json fil med alle brukerene
router.get('/users', userController.getAllUsers); 

//henter et bruker objekt med ID
router.get('/users/find/:id', userController.getUserByID); 

//sletter en bruker basert på ID
router.get('/users/delete/:id', userController.deleteUserByID);

///---------------------------------------------------------///
//Til senere utvikling:

//Fungerer ikke. Tror d har noe med access til database??
// //Oppdaterer den spesifikke brukeren
// router.put('users/:id', userController.updateUser);

// //Sletter en bruker med ID
// router.delete('users/:id', userController.deleteUser)

//----TravelDestinations---//

//Lage ny destinasjon
router.post('/travelDestinations', destinationController.createDestination)

//Hente ut destinasjoner basert på kriterie
router.get('/travelDestinations', destinationController.getAllDestinations)

//Hente ut en destinasjon basert på ID
router.get('/travelDestinations/:id', destinationController.getDestinationByID)


module.exports = router;