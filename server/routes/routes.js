const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const travelDestinationController = require('../controllers/travelDestinationController')

//----Users---//

//lager ny bruker
router.post('/users', userController.createUser);

//får en json fil med alle brukerene
router.get('/users', userController.getAllUsers); 

//henter et bruker objekt med ID
router.get('/users/:id', userController.getUserByID); 

///---------------------------------------------------------///
//Til senere utvikling:

//Fungerer ikke. Tror d har noe med access til database??
// //Oppdaterer den spesifikke brukeren
// router.put('users/:id', userController.updateUser);

// //Sletter en bruker med ID
// router.delete('users/:id', userController.deleteUser)

//----TravelDestinations---//

//Lage ny destinasjon
router.post('/travelDestinations',travelDestinationController.createDestination)

//Hente ut destinasjoner basert på kriterie
router.post('/travelDestinations', travelDestinationController.getSpecificDestinations)

//Hente ut en destinasjon basert på ID
router.post('/travelDestinations/:id', travelDestinationController.getDestinationByID)

module.exports = router;