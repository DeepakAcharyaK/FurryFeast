const mongoose = require('mongoose');

const gallerySchema =new mongoose.Schema({
    image: {
        type: String,
        required: [true, "Please upload an image"],
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
    },
}, { timestamps: true });

const Gallery = mongoose.model('Gallery', gallerySchema);

module.exports = Gallery;
