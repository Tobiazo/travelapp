let destinationModel = require('../models/destinationModel');


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
