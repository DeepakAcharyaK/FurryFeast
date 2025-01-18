const User = require('../models/userModel');
const Donation = require('../models/donationModel');
const Gallery = require('../models/galleryModel');
const Vaccination = require('../models/vaccinationModel');
const Veterinary = require('../models/veterinaryModel');
const Pet = require('../models/petModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Rescue = require('../models/rescueModel');

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
    const { donorname, email, contact, amount, currency, description, paymentReference } = req.body;

    // Validate required fields
    if (!donorname || !contact || !amount || !paymentReference) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (donorname, contact, amount, description).",
      });
    }

    // Create a new donation
    const newDonation =await Donation.create({
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

const addRescue = async (req, res) => {
  try {
    const { rescuetitle, location, description } = req.body.formData

    if(!rescuetitle || !location){
      res.status(400).json({
        message:'missing'
      })
    }

    const addedrescueinfo =await Rescue.create({
      rescuetitle,
      location,
      description
    })

    res.status(200).json({
      message: 'success',
      data: addedrescueinfo
    })

    console.log(addedrescueinfo)
  } catch (error) {
    res.status(404).json({
      message: 'failed',
      error: error
    })

  }
}

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.headers.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch user details" });
  }
};

const updateUserDetails = async (req, res) => {
  const { formData, user } = req.body; // Destructure formData and user

  if (!user || !user.id) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      user.id,
      {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        contactNumber: formData.contactNumber,
        address: formData.address,
        profilePicture: formData.profilePicture,
      },
      { new: true, runValidators: true } // Ensure updated data is returned and validators run
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser); // Return the updated user
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update user details" });
  }
};

const viewpets = async (req, res) => {
  try {
    // Ensure the Pet model is properly imported
    const pets = await Pet.find({});
    
    // Check if pets are found
    if (!pets || pets.length === 0) {
      return res.status(404).json({ message: "No pets found" });
    }

    // Respond with the pets data
    res.status(200).json(pets);
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching pets:", error);

    // Respond with an error message
    res.status(500).json({ message: "Failed to fetch pets", error: error.message });
  }
};

 const pets=async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.json(pet);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

const veterinary=async (req, res) => {
  try {
    const vet = await Veterinary.find({ petId: req.params.id }).populate('petId').populate('reviews');
    console.log(vet)
    if (!vet) return res.status(404).json({ message: "Veterinary details not found" });
    res.json(vet);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

const vaccination= async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ petId: req.params.id });
    res.json(vaccinations);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

const adopt=async (req,res)=>{
  const { id } = req.params;
  const { adoptionStatus } = req.body;

  try {
    const pet = await Pet.findByIdAndUpdate(
      id,
      { adoptionStatus },
      { new: true }
    );

    if (!pet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json(pet);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update pet status" });
  }
}

const viewveterinary=async (req, res) => {
  try {
    const veterinarians = await Veterinary.find(); // 
    res.status(200).json(veterinarians);
  } catch (error) {
    console.error("Error fetching veterinarians:", error.message);
    res.status(500).json({ error: "Failed to fetch veterinarians" });
  }
};


module.exports = {
  signup, login, gallery, addDonation, addRescue,getUserDetails,updateUserDetails,viewpets,pets,vaccination,veterinary,adopt,viewveterinary
}


