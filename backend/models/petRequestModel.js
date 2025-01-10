const mongoose = require('mongoose');

const petRequestSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a name"]
    },
    contact:{
        type:String,
        required:[true, "Please enter the contact"]
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"], // Allow only these values
        default: "Pending", // Set the default status to 'Pending'
    },
    requestdate:{
        type:Date,
        default:Date.now,
        required:[true,]
    },
})

const PetRequest = mongoose.model('PetRequest', petRequestSchema);

module.exports = PetRequest;