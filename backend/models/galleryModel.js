const mongoose = require('mongoose');

const gallerySchema =new mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please upload an image"],
    },
    imageTitle: {
        type: String,
        required: [true, "Please enter the image title"],
        minlength: [3, "Image title must be at least 3 characters long"],
        maxlength: [100, "Image title cannot exceed 100 characters"],
    },
    description: {
        type: String,
        default: null,
        maxlength: [500, "Description cannot exceed 500 characters"],
    },
    category: {
        type: String,
        default: "General", 
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
        required: false,
    },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
