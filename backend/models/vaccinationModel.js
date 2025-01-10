const mongoose = require('mongoose');

const vaccinationSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter a the pet name"]
    },
    vaccinename:{
        type:String,
        required:[true, "Please enter the vaccine name"]
    },
    vaccinationdate:{
        type: Date,
        default:Date.now,
        required:[true, "Please enter the vaccination date"]
    },
    nextduedate:{
        type:Date,
        default:Date.now,
        required:[true]
    },
    veterinarianname:{
        type:String,
        required:[true, "Please enter the veterinarian name"]
    },
})

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;