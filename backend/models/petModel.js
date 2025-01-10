const mongoose = require('mongoose');

const petSchema = mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please upload an image"]
    },
    name: {
        type: String,
        required: [true, "Please enter the name"],
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [50, "Name cannot exceed 50 characters"],
    },
    breed: {
        type: String,
        required: [true, "Please enter the breed"],
    },
    age: {
        type: Number,
        required: [true, "Please enter the age"],
        min: [0, "Age cannot be negative"],
        max: [100, "Age cannot exceed 100 years"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Unknown"],
        default: "Unknown",
    },
    vaccinated: {
        type: Boolean,
        default: false, 
    },
    adoptionStatus: {
        type: String,
        enum: ["Available", "Adopted", "Pending"],
        default: "Available",
    },
    description: {
        type: String,
        default: null, 
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
}, { timestamps: true });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet;
