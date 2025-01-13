const User = require('../models/userModel');
const Donation = require('../models/donationModel');
const Gallery = require('../models/galleryModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log(newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 3600000,
      })
      .json({
        message: "Login successful",
        user: user
      });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const gallery = async (req, res) => {
  try {
    const galleryEntries = await Gallery.find();

    if (!galleryEntries || galleryEntries.length === 0) {
      return res.status(404).json({ message: 'No gallery entries found for this user.' });
    }

    res.status(200).json({
      message: 'Gallery entries fetched successfully.',
      gallery: galleryEntries
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ message: 'An error occurred while fetching the gallery.' });
  }
};

const addDonation = async (req, res) => {
  try {
    const {donorname,email,contact,amount,currency,description,paymentReference} = req.body;

    // Validate required fields
    if (!donorname || !contact || !amount || !paymentReference) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (donorname, contact, amount, description).",
      });
    }

    // Create a new donation
    const newDonation = new Donation({
      donorname,
      email,
      contact,
      amount,
      currency: currency || "INR",
      description,
      paymentReference,
    });

    // Save the donation to the database
    const savedDonation = await newDonation.save();

    res.status(201).json({
      success: true,
      message: "Donation added successfully.",
      donation: savedDonation,
    });
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the donation.",
      error: error.message,
    });
  }
};


module.exports = {
  signup, login, gallery,addDonation
}


