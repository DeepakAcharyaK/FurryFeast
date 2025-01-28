const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  donationid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Donation",
    required: true,
  },
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nameOnCard: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: String,
    required: true,
  },
  expiryDate: {
    type: String,
    required: true,
  },
  cvv: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  }
},{ timestamps:true });

module.exports = mongoose.model("Payment", PaymentSchema);
