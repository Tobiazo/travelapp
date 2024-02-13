const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  destination_name: { type: String, required: true },
  destination_contry: { type: String, required: true},
  description: { type: String, required: true},
  
});

module.exports = mongoose.model('travelDestinations', destinationSchema);