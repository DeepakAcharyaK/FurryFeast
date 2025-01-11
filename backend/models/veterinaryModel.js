const mongoose = require('mongoose');

const veterinarySchema =new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter the veterinarian's name"],
  },
  contact: {
    type: String,
    required: [true, "Please enter a phone number"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email address"],
  },
  clinicName: {
    type: String,
    required: [true, "Please enter the clinic name"],
  },
  clinicAddress: {
    type: String,
    required: [true, "Please enter the clinic's address"],
  },
  specialization: {
    type: [String], 
    required: [true, "Please specify the specializations"],
  },
  availability: {
    type: String, 
    required: [true, "Please enter availability hours"],
  },
  location: {
    type: String,
    required: [true, "Please enter the location"],
  },
  experience: {
    type: Number, 
    required: [true, "Please enter years of experience"],
  },
  ratings: {
    type: Number, 
    default: 0,
    min: 0,
    max: 5,
  },
  reviews: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
      },
      comment: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
},{
    timestamps:true
});

const Veterinary = mongoose.model('Veterinary', veterinarySchema);

module.exports = Veterinary;
