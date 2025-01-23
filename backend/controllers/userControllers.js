const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Donation = require('../models/donationModel');
const Gallery = require('../models/galleryModel');
const Vaccination = require('../models/vaccinationModel');
const Veterinary = require('../models/veterinaryModel');
const Pet = require('../models/petModel');
const Rescue = require('../models/rescueModel');

const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    console.log("Signup process started.");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already exists. Sending error response.");
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
        error: "Email is already associated with another account.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT_ROUND));

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    console.log("User registered successfully:", newUser);
    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: newUser,
    });

  } catch (error) {
    console.error("An error occurred during signup:", error.message);
    res.status(500).json({
      success: false,
      message: "An error occurred during signup.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Error: Invalid email. User not found.");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        isloggedin: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Error: Password mismatch.");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        isloggedin: false,
      });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("Login successful for user:", user.email);
    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: user,
      token: token,
      role: user.role,
      isloggedin: true,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during login.",
      error: error.message,
    });
  }
};

const search = async (req, res) => {
  try {
    const { userid } = req.query;

    if (!userid) {
      return res.status(400).json({ error: 'userid is required' });
    }

    const foundUser = await User.findById(userid);

    if (!foundUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      user: foundUser,
    });
  } catch (error) {
    console.error('Error during user search:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const addDonation = async (req, res) => {
  try {
    const { donorname, contact, amount, currency, description, paymentReference } = req.body.formData;

    if (!donorname || !contact || !amount || !paymentReference) {
      console.log("Error: Missing required fields in donation data.");
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (donorname, contact, amount, paymentReference).",
      });
    }

    const newDonation = await Donation.create({
      donorname,
      donatedby: req.body.userid,
      contact,
      amount,
      currency: currency || "INR",
      description,
      paymentReference,
    });

    console.log("Donation added successfully:", newDonation);
    res.status(201).json({
      success: true,
      message: "Donation added successfully.",
      donationDetails: newDonation,
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

const gallery = async (req, res) => {
  try {
    const galleryEntries = await Gallery.find();

    if (!galleryEntries || galleryEntries.length === 0) {
      console.log("No gallery entries found.");
      return res.status(404).json({
        success: false,
        message: "No gallery entries found.",
      });
    }

    console.log("Gallery entries fetched successfully.");
    res.status(200).json({
      success: true,
      message: "Gallery entries fetched successfully.",
      gallery: galleryEntries,
    });
  } catch (error) {
    console.error("Error fetching gallery:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching the gallery.",
      error: error.message,
    });
  }
};

const addRescue = async (req, res) => {
  try {
    const { rescuetitle, location, description } = req.body.formData;

    if (!rescuetitle || !location) {
      console.log("Error: Missing required fields (rescuetitle or location).");
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (rescuetitle and location).",
      });
    }

    const addedrescueinfo = await Rescue.create({
      rescuetitle,
      location,
      description,
    });

    console.log("Rescue information added successfully:", addedrescueinfo);
    res.status(201).json({
      success: true,
      message: "Rescue information added successfully.",
      data: addedrescueinfo,
    });
  } catch (error) {
    console.error("Error adding rescue information:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding rescue information.",
      error: error.message,
    });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.headers.id);

    if (!user) {
      console.log(`User with ID ${req.headers.id} not found.`);
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    console.log("User details fetched successfully:", user);
    res.status(200).json({
      success: true,
      message: "User details fetched successfully.",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching user details.",
      error: error.message,
    });
  }
};

const updateUserDetails = async (req, res) => {
  const { formData, user } = req.body; // Destructure formData and user

  if (!user || !user.id) {
    console.log("Error: User ID is required.");
    return res.status(400).json({
      success: false,
      message: "User ID is required",
    });
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
      console.log(`User with ID ${user.id} not found.`);
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    console.log("User details updated successfully:", updatedUser);
    res.status(200).json({
      success: true,
      message: "User details updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating user details.",
      error: error.message,
    });
  }
};

const viewpets = async (req, res) => {
  try {
    const pets = await Pet.find({});

    if (!pets || pets.length === 0) {
      console.log("No pets found.");
      return res.status(404).json({
        success: false,
        message: "No pets found.",
      });
    }

    console.log("Pets fetched successfully:", pets);
    res.status(200).json({
      success: true,
      message: "Pets fetched successfully.",
      data: pets,
    });
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching pets.",
      error: error.message,
    });
  }
};

const pets = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      console.log(`Pet with ID ${req.params.id} not found.`);
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    console.log("Pet details fetched successfully:", pet);
    res.status(200).json({
      success: true,
      message: "Pet details fetched successfully.",
      data: pet,
    });
  } catch (err) {
    console.error("Error fetching pet details:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching pet details.",
      error: err.message,
    });
  }
};

const veterinary = async (req, res) => {
  try {
    const vet = await Veterinary.find({ petId: req.params.id })
      .populate('petId')
      .populate('reviews');

    if (!vet || vet.length === 0) {
      console.log(`No veterinary details found for pet with ID ${req.params.id}`);
      return res.status(404).json({
        success: false,
        message: "Veterinary details not found",
      });
    }

    console.log("Veterinary details fetched successfully:", vet);
    res.status(200).json({
      success: true,
      message: "Veterinary details fetched successfully.",
      data: vet,
    });
  } catch (err) {
    console.error("Error fetching veterinary details:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching veterinary details.",
      error: err.message,
    });
  }
};

const vaccination = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find({ petId: req.params.id });

    if (!vaccinations || vaccinations.length === 0) {
      console.log(`No vaccinations found for pet with ID ${req.params.id}`);
      return res.status(200).json({
        success: false,
        message: "No vaccinations found for this pet",
      });
    }

    console.log("Vaccination details fetched successfully:", vaccinations);
    res.status(200).json({
      success: true,
      message: "Vaccination details fetched successfully.",
      data: vaccinations,
    });
  } catch (err) {
    console.error("Error fetching vaccination details:", err);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching vaccination details.",
      error: err.message,
    });
  }
};

const adopt = async (req, res) => {
  const { id } = req.params;
  const { adoptionStatus } = req.body;

  try {
    const pet = await Pet.findByIdAndUpdate(
      id,
      { adoptionStatus },
      { new: true }
    );

    if (!pet) {
      console.log(`Pet with ID ${id} not found.`);
      return res.status(404).json({
        success: false,
        message: "Pet not found",
      });
    }

    console.log(`Pet adoption status updated successfully for pet with ID ${id}:`, pet);
    res.status(200).json({
      success: true,
      message: "Pet adoption status updated successfully.",
      data: pet,
    });
  } catch (error) {
    console.error("Error updating pet adoption status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update pet status",
      error: error.message,
    });
  }
};

const viewveterinary = async (req, res) => {
  try {
    const veterinarians = await Veterinary.find();

    if (!veterinarians || veterinarians.length === 0) {
      console.log("No veterinarians found.");
      return res.status(404).json({
        success: false,
        message: "No veterinarians found",
      });
    }

    console.log("Veterinarians fetched successfully:", veterinarians);
    res.status(200).json({
      success: true,
      message: "Veterinarians fetched successfully.",
      data: veterinarians,
    });
  } catch (error) {
    console.error("Error fetching veterinarians:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch veterinarians",
      error: error.message,
    });
  }
};





module.exports = {
  signup, login, gallery, addDonation, addRescue, getUserDetails, updateUserDetails, viewpets, pets, vaccination, veterinary, adopt, viewveterinary,search
}


