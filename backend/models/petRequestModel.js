const mongoose = require('mongoose');

const petRequestSchema = new mongoose.Schema({
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
        default:Date.now
    },
},{
    timestamps:true
})

const PetRequest = mongoose.model('PetRequest', petRequestSchema);

module.exports = PetRequest;
