const mongoose = require('mongoose');

const vaccinationSchema = new mongoose.Schema({
  petId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet',
    required: [true, "Please specify the pet ID"],
  },
  petName: {
    type: String,
    required: [true, "Please enter the pet's name"],
  },
  vaccineName: {
    type: String,
    required: [true, "Please enter the vaccine name"],
  },
  vaccinationDate: {
    type: Date,
    default: Date.now,
    required: [true, "Please enter the vaccination date"],
  },
  nextDueDate: {
    type: Date,
    required: [true, "Please enter the next due date for vaccination"],
  },
  vaccinationNotes: {
    type: String,
    default: "",
    required: false, 
  },
  status: {
    type: String,
    enum: ["Completed", "Pending", "Overdue"], 
    default: "Completed",
    required: true,
  },
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;
