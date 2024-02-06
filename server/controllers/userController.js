const User = require('../models/userModel');


//lager ny bruker
exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};





//Sletter bruker

//Få alle brukere

//Få en bruker fra id

//Oppdater en bruker fra id

