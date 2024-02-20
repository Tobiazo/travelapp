let imageModel = require('../models/imageModel');
const multer = require('multer');
const path = require('path');   



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/Images');  
    }, 
    filename: (req, file, cb) => {
      cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
  });     
    
  
  const upload =  multer({
    storage: storage
  })
  
  //laste opp bilde til database
  exports.uploadImage = (req, res) => {
    imageModel.create({image: req.file.filename})
    .then(result => res.json(result))
    .catch(err => console.log(err))
  } 
  
  