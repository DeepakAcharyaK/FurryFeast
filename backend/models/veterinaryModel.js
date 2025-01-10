const mongoose = require('mongoose');

const veterinarySchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Plaease enter a name"]
    },
    contact:{
        type:String,
        required:[true, "Please enter a phone number"]
    },
    clinic:{
        type:String,
        required:[true, "Please enter the clinic name"]
    },
    availability:{
        type:Date,
        default:Date.now,
        required:[true, "Plaese enter availability hour"]
    },
    location:{
        type: String,
        required: [true, "Please enter the address"],
    },
})

const Veterinary = mongoose.model('Veterinary', veterinarySchema);

module.exports = Veterinary;