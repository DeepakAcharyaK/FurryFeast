const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
    donorname: {
        type: String,
        required: [true, "Please enter a username"],
        minlength: [3, "Username must be at least 3 characters long"],
    },
    email: {
        type: String,
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
        type: String,
        required: [true, "Please enter the description"],
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
    },
    donationdate: {
        type: Date,
        default: Date.now,
    },
    paymentReference: {
        type: String,
    },
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
