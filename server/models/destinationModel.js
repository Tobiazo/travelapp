const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  destination_name: { type: String, required: true },
  destination_contry: { type: String, required: true},
  ShortDescription: { type: String, required: true},
  category: { type:[String], required: false}, 
  rating: {type: Number, required: false}, 
  imgPath: {type: String, require: false},
});

module.exports = mongoose.model('travelDestinations', destinationSchema);