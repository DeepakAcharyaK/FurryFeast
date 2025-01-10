const mongoose = require('mongoose');

const volunteerSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true, "Plaease enter a username"]
    },
    contact:{
        type:String,
        required:[true, "Please enter a phone number"]
    },
    availability:{
        type:Date,
        default:Date.now,
        required:[true, "Plaese enter the rescue data"]
    },
    description:{
        type: String,
        required: [true, "Please enter the description"],
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"], // Allow only these values
        default: "Pending", // Set the default status to 'Pending'
    },
})

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;