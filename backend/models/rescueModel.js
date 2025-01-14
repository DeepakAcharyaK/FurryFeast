const mongoose = require('mongoose');

const rescueSchema =new mongoose.Schema({
  rescuedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Volunteer",
    required: false,
  },
  rescueinfoby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  rescuetitle:{
    type:String,
    required:[true,'Please enter the rescue title']
  },
  location: {
    type: String,
    required: [true, "Please enter the location"],
  },
  description: {
    type: String,
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