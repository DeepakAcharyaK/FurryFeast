const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");

const Admin = require('../models/adminModel');
const User = require('../models/userModel');
const Donation = require('../models/donationModel');
const Gallery = require('../models/galleryModel');
const Vaccination = require('../models/vaccinationModel');
const Veterinary = require('../models/veterinaryModel');
const Pet = require('../models/petModel');
const Rescue = require('../models/rescueModel');
const PetRequest = require('../models/petRequestModel');


//login✅ 
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email, password });

    if (!admin) {
      console.log("Error: Invalid email. Admin not found.");
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
        isloggedin: false,
      });
    }

    console.log("Login successful for Admin:", admin.email);
    res.status(200).json({
      success: true,
      message: "Login successful.",
      admin: admin,
      role: 'admin',
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

//fetch dets✅
const getAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findOne({});

    if (!admin) {
      console.log(`Admin not found.`);
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    console.log("Admin details fetched successfully:", admin.email, admin.password);
    res.status(200).json({
      success: true,
      message: "Admin details fetched successfully.",
      data: admin,
    });
  } catch (error) {
    console.error("Error fetching admin details:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while fetching admin details.",
      error: error.message,
    });
  }
};

//update dets✅
const updateAdminDetails = async (req, res) => {
  try {
    const { email, password } = req.body;

    const foundAdmin = await Admin.findOne({ email: email });

    if (!foundAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    const updatedAdmin = await Admin.findOneAndUpdate({
      email
    },
      { password },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Admin details updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    console.error("Error updating admin details:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

//fetch gallery✅
const gallery = async (_req, res) => {
  try {
    const galleryItems = await Gallery.find({});
    if (!galleryItems || galleryItems.length === 0) {
      return res.status(404).json({ message: 'No gallery items found' });
    }
    res.status(200).json({
      message: 'Gallery fetched successfully',
      data: galleryItems
    });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ message: 'Failed to fetch gallery' });
  }
};

//delete image✅
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const deletedImage = await Gallery.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.status(200).json({ message: 'Image deleted successfully', data: deletedImage });
  } catch (error) {
    console.error('Error deleting image:', error);
    res.status(500).json({ message: 'Failed to delete image' });
  }
};

//add image✅
const addImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }
    const newImage = new Gallery({
      image: "/uploads/" + req.file.filename
    });

    await newImage.save();

    res.status(201).json({ message: "Image uploaded successfully", data: newImage });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//donation✅
const manageDonations = async (req, res) => {
  try {
    const donations = await Donation.find().populate('donatedby');
    res.status(200).json({ message: 'Donations fetched successfully', donations });
  } catch (error) {
    console.error('Error fetching donations:', error);
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
};

//add verterinaries✅
const addVeterinaries = async (req, res) => {
  try {
    const { name, email, contact, clinicName, clinicAddress, specialization, availability, location, experience, rating } = req.body;
    const newVeterinary = await Veterinary.create({
      name, email, contact, clinicName, clinicAddress, specialization, availability, location, experience, rating
    });
    res.status(201).json({ message: "Veterinary added successfully", newVeterinary });
  } catch (error) {
    console.error("Error saving veterinary:", error);
    res.status(500).json({ error: error.message });
  }
};

//edit verterinaries✅
const editVeterinaries = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, contact, clinicName, clinicAddress, specialization, availability, location, experience, rating } = req.body;
    const newVeterinary = await Veterinary.findByIdAndUpdate(id, {
      name, email, contact, clinicName, clinicAddress, specialization, availability, location, experience, rating
    }, {
      new: true
    });
    res.status(201).json({ message: "Veterinary updated successfully", newVeterinary });
  } catch (error) {
    console.error("Error updating veterinary:", error);
    res.status(500).json({ error: error.message });
  }
};

//delete verterinaries✅
const deleteVeterinaries = async (req, res) => {
  try {
    const { id } = req.params;
    const newVeterinary = await Veterinary.findByIdAndDelete(id, {
      new: true
    });
    res.status(201).json({ message: "Veterinary deleted successfully", newVeterinary });
  } catch (error) {
    console.error("Error delete veterinary:", error);
    res.status(500).json({ error: error.message });
  }
};

//addvaccination
const addVaccinationDetails = async (req, res) => {
  try {
    const {
      petId,
      petName,
      vaccineName,
      vaccinationDate,
      nextDueDate,
      vaccinationNotes,
      status
    } = req.body;

    // Basic validation
    if (!petId || !petName || !vaccineName || !vaccinationDate || !nextDueDate || !status) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    // Check if pet exists
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Create new vaccination document
    const newVaccination = new Vaccination({
      petId,
      petName,
      vaccineName,
      vaccinationDate,
      nextDueDate,
      vaccinationNotes,
      status
    });

    await newVaccination.save();

    console.log("New vaccination details added:", newVaccination);
    console.log("Pet before updating:", pet);

    // Push vaccination ID to pet's vaccinationDets array
    pet.vaccinationDets.push(newVaccination._id);
    await pet.save();

    console.log("Vaccination ID pushed to pet:", pet);

    res.status(201).json({
      message: 'Vaccination details added successfully',
      newVaccination
    });

  } catch (error) {
    console.error('Error adding vaccination details:', error);
    res.status(500).json({ message: 'Failed to add vaccination details' });
  }
};

//fetch veterinarians✅
const manageVeterinaries = async (req, res) => {
  try {
    const Veterinaries = await Veterinary.find();
    res.status(200).json({ message: 'Veterinary  fetched successfully', Veterinaries });
  } catch (error) {
    console.error('Error fetching veterinary:', error);
    res.status(500).json({ message: 'Failed to fetch veterinary' });
  }
};

//fetch vaccinations✅
const manageVaccinations = async (req, res) => {
  try {
    const vaccinations = await Vaccination.find();
    res.status(200).json({ message: 'Vaccination  fetched successfully', vaccinations });
  } catch (error) {
    console.error('Error fetching vaccination:', error);
    res.status(500).json({ message: 'Failed to fetch vaccination' });
  }
};

//delete vaccinations✅
const deleteVaccinations = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVaccination = await Vaccination.findByIdAndDelete(id);
    if (!deletedVaccination) {
      return res.status(404).json({ message: 'Vaccination not found' });
    }
    res.status(200).json({ message: 'Vaccination deleted successfully', deletedVaccination });
  } catch (error) {
    console.error('Error deleting vaccination:', error);
    res.status(500).json({ message: 'Failed to delete vaccination' });
  }
}

//edit vaccinations✅
const editVaccinations = async (req, res) => {
  try {
    const { id } = req.params;
    const { petName, vaccineName, vaccinationDate, nextDueDate, vaccinationNotes } = req.body;

    const updatedVaccination = await Vaccination.findByIdAndUpdate(id, {
      petName,
      vaccineName,
      vaccinationDate,
      nextDueDate,
      vaccinationNotes
    }, { new: true });

    if (!updatedVaccination) {
      return res.status(404).json({ message: 'Vaccination not found' });
    }

    res.status(200).json({ message: 'Vaccination updated successfully', updatedVaccination });
  } catch (error) {
    console.error('Error updating vaccination:', error);
    res.status(500).json({ message: 'Failed to update vaccination' });
  }
}
















// =================== Rescue Management ===================
const manageRescues = async (req, res) => {
  try {
    const rescues = await Rescue.find().populate('rescueinfoby').populate('rescuedby');
    res.status(200).json({ message: 'Rescues  fetched successfully', rescues });
  } catch (error) {
    console.error('Error fetching rescues:', error);
    res.status(500).json({ message: 'Failed to fetch rescues' });
  }
};

const updateStatus1 = async (req, res) => {
  try {
    const { rescueId } = req.params;
    const { status } = req.body;
    const updatedRescue = await Rescue.findByIdAndUpdate(rescueId, { status: status }, { new: true });
    res.status(200).json({ updatedRescue });
  } catch (error) {
    console.error('Error updating rescue status:', error);
    res.status(500).json({ message: 'Failed to update rescue status' });
  }
};

const deleteRescue = async (req, res) => {
  try {
    const { rescueId } = req.params;
    const deletedRescue = await Rescue.findByIdAndDelete(rescueId);
    res.status(200).json({ deletedRescue });
  } catch (error) {
    console.error('Error deleting rescue:', error);
    res.status(500).json({ message: 'Failed to delete rescue' });
  }
};

// =================== Pet Dog Management ===================
const managePetDog = async (req, res) => {
  try {
    const pets = await Pet.find().populate('vaccinationDets');
    res.status(200).json({ message: 'Pet Dog  fetched successfully', pets });
  } catch (error) {
    console.error('Error fetching pet dog:', error);
    res.status(500).json({ message: 'Failed to fetch pet dog' });
  }
};

const addPetDog = async (req, res) => {
  try {
    console.log("Name:", req.file)
    const { name, breed, age, gender, adoptionStatus, description } = req.body;

    if (!name || !breed || !age || !adoptionStatus || !gender) {
      console.log("Error: Missing required fields.");
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (name, breed, age, gender, adoptionStatus).",
      });
    }

    const profilePicture = req.file
      ? `/uploads/${req.file.filename}`
      : `/uploads/default-profile.jpg`;

    const newPet = await Pet.create({
      name,
      breed,
      age,
      image: profilePicture,
      vaccinationDets: [],
      gender,
      adoptionStatus,
      description,
    });

    console.log("New pet added successfully:", newPet);

    res.status(201).json({
      success: true,
      message: "Pet added successfully.",
      pet: newPet,
    });
  } catch (error) {
    console.error("Error adding pet:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while adding the pet.",
      error: error.message,
    });
  }
};

const editPetDog = async (req, res) => {
  try {
    const { petId } = req.params;

    let updatedData = {};

    if (req.body.name) updatedData.name = req.body.name;
    if (req.body.breed) updatedData.breed = req.body.breed;
    if (req.body.age) updatedData.age = req.body.age;
    if (req.body.gender) updatedData.gender = req.body.gender;
    if (req.body.adoptionStatus) updatedData.adoptionStatus = req.body.adoptionStatus;
    if (req.body.description) updatedData.description = req.body.description;
    if (req.file) updatedData.image = `/uploads/${req.file.filename}`;

    if (Object.keys(updatedData).length === 0) {
      return res.status(400).json({ message: "No valid fields provided for update" });
    }

    const updatedPet = await Pet.findByIdAndUpdate(petId, { $set: updatedData }, { new: true, runValidators: true });

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json({
      message: "Pet details updated successfully",
      pet: updatedPet,
    });
  } catch (error) {
    console.error("Error updating pet:", error);
    res.status(500).json({ message: "Error updating pet details", error: error.message });
  }
};

const deletePetDog = async (req, res) => {
  try {
    const { petId } = req.params;
    console.log("Received Pet ID:", petId);

    if (!mongoose.Types.ObjectId.isValid(petId)) {
      return res.status(400).json({ error: "Invalid pet ID format" });
    }

    const deletedPet = await Pet.findByIdAndDelete(petId);

    if (!deletedPet) {
      return res.status(404).json({ error: "Pet not found" });
    }

    res.status(200).json({ message: "Pet deleted successfully", deletedPet });
  } catch (error) {
    console.error("Error deleting pet:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// =================== Pet Request Management ===================
//pet request fetch✅
const managePetRequest = async (req, res) => {
  try {
    const petrequests = await PetRequest.find().populate('userId').populate('petId');
    if (!petrequests || petrequests.length === 0) {
      return res.status(404).json({ message: 'No pet requests found' });
    }
    res.status(200).json({ message: 'Requested dog fetched successfully', petrequests });
  } catch (error) {
    console.error('Error fetching requested dog:', error);
    res.status(500).json({ message: 'Failed to fetch requested dog' });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const { petId } = req.params;
    const { status } = req.body;
    const updatedRequest = await PetRequest.findByIdAndUpdate(petId, { status: status }, { new: true });
    res.status(200).json({ updatedRequest });
  } catch (error) {
    console.error('Error updating pet request status:', error);
    res.status(500).json({ message: 'Failed to update pet request status' });
  }
};

const deletePetRequest = async (req, res) => {
  try {
    const { petId } = req.params;
    const deletedRequest = await PetRequest.findByIdAndDelete(petId);
    res.status(200).json({ deletedRequest });
  } catch (error) {
    console.error('Error deleting pet request:', error);
    res.status(500).json({ message: 'Failed to delete pet request' });
  }
};









const getDashboardStats = async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const donationCount = await Donation.countDocuments();
    const adoptedPetCount = await Pet.countDocuments({ status: "adopted" });
    const imageCount = await Gallery.countDocuments();
    const petRequestCount = await PetRequest.countDocuments();
    const veterinaryCount = await Veterinary.countDocuments();

    res.status(200).json({
      users: userCount,
      donations: donationCount,
      adoptedPets: adoptedPetCount,
      totalImages: imageCount,
      petRequested: petRequestCount,
      veterinary: veterinaryCount,
    });
  } catch (error) {
    console.error("Dashboard stats fetch error:", error);
    res.status(500).json({ message: "Failed to fetch dashboard stats" });
  }
};


module.exports = {
  // Admin
  adminLogin,
  getAdminDetails,
  updateAdminDetails,

  // Rescues
  manageRescues,
  updateStatus1,
  deleteRescue,

  // Gallery
  gallery,
  deleteImage,
  addImage,


  // Donations
  manageDonations,

  // Veterinaries
  addVeterinaries,
  editVeterinaries,
  deleteVeterinaries,
  manageVeterinaries,

  // Vaccinations
  addVaccinationDetails,
  manageVaccinations,
  deleteVaccinations,
  editVaccinations,

  // Pets
  managePetDog,
  addPetDog,
  editPetDog,
  deletePetDog,

  // Pet Requests
  managePetRequest,
  updateRequestStatus,
  deletePetRequest,


  getDashboardStats
};
