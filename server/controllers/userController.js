let userModel = require('../models/userModel');


//lager ny bruker. funker ikke:) 
exports.createUser = async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ message: error.message });
  }
};


//get alle brukere
exports.getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        //skal vi legge inn en status her?
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};



//henter én bruker fra databasen med id
exports.getUserByID = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if(!user){
      return res.status(404).json({error: "User not found"})
    }
    res.status(200).json(user); 
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message })
  }
}

//Sletter bruker ved hjelp av ID
exports.deleteUserByID= async (req, res) => {
  try {
    const deletedUser = await userModel.findByIdAndDelete(req.params.id);
    if(!deletedUser){
      return res.status(404).json({error: "User not found"})
    }
    res.status(200).send("User deleted!");
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message })
  }
}

//Oppdaterer bruker ved hjelp av ID
exports.updateUserByID = async (req, res) => {
  try {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body);
    if(!updatedUser){
      return res.status(404).json({error: "User not found"})
    }
    res.status(200).send("User updated!");
  } catch (error) {
    console.error(error); 
    res.status(500).json({ message: error.message })
  }
}