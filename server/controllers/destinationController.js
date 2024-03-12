const path = require('path');
let destinationModel = require('../models/destinationModel');
const multer = require('multer');
const { getAllUsers } = require('./userController');
const userModel = require('../models/userModel')




//oppretter ny destinasjon
exports.createDestination = async (req, res) => {
  try {
    const destination = new destinationModel(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message });
  }
};


//henter alle eller spesifikke destinasjoner basert på parametre i find({})
exports.getAllDestinations = async (req, res) => {
    try {
        const destinations = await destinationModel.find({}); //Legg inn info i find for å filtrere?
        res.json(destinations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



//henter én bruker fra databasen med id
exports.getDestinationByID = async (req, res) => {
  try {
    const destination = await destinationModel.findById(req.params.id);
    if(!destination){
      return res.status(404).json({error: "Destination not found"})
    }
    res.status(200).json(destination); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message })
  }
}

//Sletter en destinasjon fra databasen med ID
exports.deleteDestinationByID= async (req, res) => {
  try {
    const deletedDestination = await destinationModel.findByIdAndDelete(req.params.id);
    if(!deletedDestination){
      return res.status(404).json({error: "Destination not found"})
    }
    res.status(200).send("Destination deleted!");
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message })
  }
}

//Oppdaterer en destinasjon fra databasen med ID
exports.updateDestinationByID = async (req, res) => {
  try {
    const updatedDestination = await destinationModel.findByIdAndUpdate(req.params.id, req.body);
    if(!updatedDestination){
      return res.status(404).json({error: "Destination not found"})
    }
    res.status(200).send("Destination updated!");
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message })
  }
}



exports.getAverage = async (req, res) => {
  try {
    const destinationId = req.params.id;

    // finner destinasjonen
    const destination = await destinationModel.findById(destinationId);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found." });
    }

    let totalRating = 0;
    let numberOfRatings = 0;

    // itererer over hver bruker
    const users = await userModel.find({});
    for (const user of users) {
      // Sjekker om bruker har ratet destinasjonen
      const ratedDestination = user.destinations.find(dest => dest && dest.destinationId === destinationId);
      if (ratedDestination && ratedDestination.reviewValue !== null) {
        totalRating += ratedDestination.reviewValue;
        numberOfRatings++;
      }
    }

    // regner ut gjennomsnittlig rating 
    let averageRating = (totalRating / numberOfRatings).toFixed(1) ;
    if (!averageRating) {
      averageRating = "-"; 
    }

    // returnerer ratingen. 
    res.json({ averageRating });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

