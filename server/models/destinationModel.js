const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  destination_name: { type: String, required: true },
  destination_contry: { type: String, required: true},
  destination_continent: {type:String, required: true},
  destination_climate: {type:String, required: true},
  ShortDescription: { type: String, required: true},
  category: { type:[String], required: false}, 
  imgPath: {type: String, required: false},
  longDescription : {type: String, required: false},
  author : {type: String, required: true}
});

module.exports = mongoose.model('travelDestinations', destinationSchema); 