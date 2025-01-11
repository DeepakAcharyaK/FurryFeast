const mongoose = require('mongoose');

const volunteerSchema =new mongoose.Schema({
    username:{
        type:String,
        required:[true, "Plaease enter a username"]
    },
    contact:{
        type:Number,
        required:[true, "Please enter a phone number"]
    },
    availability:{
        type:Number,
        required:[true, "Plaese enter the rescue data"]
    },
    description:{
        type: String,
        required: [true, "Please enter the description"],
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"], 
        default: "Pending", 
    },
    worksassigned:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Work'
        }
    ]
},{
    timestamps:true
})

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;