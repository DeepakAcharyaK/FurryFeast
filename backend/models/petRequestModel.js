const mongoose = require('mongoose');

const petRequestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a name"]
    },
    contact:{
        type:String,
        required:[true, "Please enter the contact"]
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    petId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pet",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending", 
    },
    requestdate:{
        type:Date,
        default:Date.now,
        required:[true,]
    },
},{
    timestamps:true
})

const PetRequest = mongoose.model('PetRequest', petRequestSchema);

module.exports = PetRequest;
