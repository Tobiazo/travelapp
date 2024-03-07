const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true},
  password: { type: String, required: true},
  isAdmin: { type: Boolean, required: true},
  destinations:[{
    destinationId : {type: String, required: true},
    reviewValue : {type: Number, required: true},
    hasVisited : {type: Boolean, required: true}
  }]
});

module.exports = mongoose.model('User', userSchema);


//exporter User