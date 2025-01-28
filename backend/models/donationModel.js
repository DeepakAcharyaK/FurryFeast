const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorname: {
        type: String,
        required: [true, "Please enter a username"],
    },
    donatedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    contact: {
        type: String,
        required: [true, "Please enter a phone number"]
    },
    amount: {
        type: Number,
        required: [true, "Please specify the amount"],
        min: [0, "Amount cannot be negative"],
    },
    currency: {
        type: String,
        default: "INR",
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ["Pending", "Done"],
        default: "Pending",
    }
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
