const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        required:[true],
        default:'admin@gmail.com'
        
    },
    password:{
        type:String,
        required:[true],
        default:'admin'
    },
    profile:{
        type:String,
        default: "https://example.com/default-profile.png"
    },
    donation:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Donation'
    }
    ],
    gallery:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Gallery'
        }
    ],
    rescuedpets:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Rescue'
        }
    ],
    
    veterinary:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Veterinary'
        }
    ],
    volunteer:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Volunteer'
        }
    ]
        
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;