const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username"],
      },
      email: {
        type: String,
        required: [true, "Please enter an email"],
        unique: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: [true, "Please enter a password"]
      },
      role: {
        type: String,
        enum: ["admin", "customer","volunteer"],
        default: "customer",
      },
      contactNumber: {
        type: String,
      },
      address: {
        type: String,
      },
      profilePicture: {
        type: String,
        default: "/users/default-profile.jpg",
      },
      isActive: {
        type: Boolean,
        default: true, 
      },
      adoptedpets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'PetRequest'
        }
      ],
      rescuedpets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Rescue'
        }
      ],
      donation:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Donation'
        }
      ]
      
})

const User = mongoose.model('User', userSchema);

module.exports = User;