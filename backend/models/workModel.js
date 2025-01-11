const mongoose = require('mongoose');

const workSchema =new mongoose.Schema({
  taskname: [
    {
      type: String,
      required: [true, "Please enter a task name"],
    },
  ],
  description: {
    type: String, 
    required: [true, "Please provide a task description"],
  },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Volunteer',
    required: [true, "Please assign a volunteer"],
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin', 
    required: [true, "Please specify who assigned the task"],
  },
  deadline: {
    type: Date,
    required: [true, "Please enter the deadline"],
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed", "Rejected"], 
    default: "Pending",
  }
},{
    timestamps:true
});

const Work = mongoose.model('Work', workSchema);

module.exports = Work;
