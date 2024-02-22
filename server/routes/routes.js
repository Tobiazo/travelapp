const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const destinationController = require('../controllers/destinationController');

//----Users---//

//lager ny bruker
router.post('/users', userController.createUser);

//får en json fil med alle brukerene
router.get('/users', userController.getAllUsers); 

//henter et bruker objekt med ID
router.get('/users/find/:id', userController.getUserByID); 

//sletter en bruker basert på ID
router.delete('/users/delete/:id', userController.deleteUserByID);

//Oppdaterer en bruker basert på ID
router.put('/users/edit/:id', userController.updateUserByID)

///---------------------------------------------------------///
//Til senere utvikling:

//Fungerer ikke. Tror d har noe med access til database??
// //Oppdaterer den spesifikke brukeren
// router.put('users/:id', userController.updateUser);

//----TravelDestinations---//

//Lage ny destinasjon
router.post('/travelDestinations', destinationController.createDestination)

//Hente ut destinasjoner basert på kriterie
router.get('/travelDestinations', destinationController.getAllDestinations)

//Hente ut en destinasjon basert på ID
router.get('/travelDestinations/:id', destinationController.getDestinationByID)

//Sletter en destinasjon basert på ID
router.delete('/travelDestinations/delete/:id', destinationController.deleteDestinationByID)

//Oppdaterer en destinasjon basert på ID
router.put('/travelDestinations/edit/:id', destinationController.updateDestinationByID)
 
// //laste opp bilde til reisedestinasjon
// router.post('/upload', upload.single('file'), imageController.uploadImage)
  
module.exports = router;