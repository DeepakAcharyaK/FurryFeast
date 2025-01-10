const mongoose = require('mongoose');

const rescueSchema =new mongoose.Schema({
  rescuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer",
    required: false,
  },
  rescueinfoBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  location: {
    type: String,
    required: [true, "Please enter the location"],
  },
  rescuedate:{
    type: Date,
    default:Date.now,
  },
  rescuetime:{
    type: Date,
    default: Date.now, 
  },
  description: {
    type: String,
    required: [true, "Please enter the description"],
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Cancelled"],
    default: "Pending",
  },
  image:{
    type:String,
  }
},{
  timestamps:true
});

const Rescue = mongoose.model('Rescue', rescueSchema);

module.exports = Rescue;