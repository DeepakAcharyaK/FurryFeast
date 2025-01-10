const mongoose = require('mongoose');

const rescueSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter a username"],
  },
  contact: {
    type: String,
    required: [true, "Please enter a phone number"],
  },
  location: {
    type: String,
    required: [true, "Please enter the location"],
  },
  rescuedate: {
    type: Date,
    default:Date.now,
    required: [true, "Please enter the rescue data"],
  },
  time: {
    type: Date,
    default: Date.now, // Default to the current timestamp
  },
  description: {
    type: String,
    required: [true, "Please enter the description"],
  },
});

const Rescue = mongoose.model('Rescue', rescueSchema);

module.exports = Rescue;
