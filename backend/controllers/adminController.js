const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose"); 
const Admin = require('../models/adminModel');
const Donation = require('../models/donationModel');
const Gallery = require('../models/galleryModel');
const Vaccination = require('../models/vaccinationModel');
const Veterinary = require('../models/veterinaryModel');
const Pet = require('../models/petModel');
const Rescue = require('../models/rescueModel');

const adminLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const admin = await Admin.findOne({ email,password });

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

// Manage Donations
const manageDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate('donatedby');
        res.status(200).json({ message: 'Donations fetched successfully', donations });
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ message: 'Failed to fetch donations' });
    }
};

const updateStatus=async(req,res)=>{
  const {donationId}=req.params;
  const {status}=req.body;
  const updatedDonation=await Donation.findByIdAndUpdate(donationId,{status:status},{new:true})
  res.status(200).json({
    updatedDonation
  })
}

const deleteDonation=async(req,res)=>{
  const {donationId}=req.params;
  const deletedDonation=await Donation.findByIdAndDelete(donationId)
  res.status(200).json({
    deletedDonation
  })
}

// Manage Rescues
const manageRescues = async (req, res) => {
    try {
        const rescues = await Rescue.find().populate('rescueinfoby').populate('rescuedby');
        res.status(200).json({ message: 'Rescues  fetched successfully', rescues });
    } catch (error) {
        console.error('Error fetching rescues:', error);
        res.status(500).json({ message: 'Failed to fetch rescues' });
    }
};

const updateStatus1 =async(req,res)=>{
  const {rescueId}=req.params;
  const {status}=req.body;
  const updatedRescue=await Rescue.findByIdAndUpdate(rescueId,{status:status},{new:true})
  res.status(200).json({
    updatedRescue
  })
};

const deleteRescue=async(req,res)=>{
  const {rescueId}=req.params;
  const deletedRescue=await Rescue.findByIdAndDelete(rescueId)
  res.status(200).json({
    deletedRescue
  })
};

// add veterinary

const addVeterinaries = async (req, res) => {
  try {
    const { name,email,contact,clinicName,clinicAddress,specialization,availability,location,experience,rating}=req.body.formValues
    const newVeterinary = await Veterinary.create({
      name,email,contact,clinicName,clinicAddress,specialization,availability,location,experience,rating
    })
    res.status(201).json({ message: "Veterinary added successfully",newVeterinary });
  } catch (error) {
    console.error("Error saving veterinary:", error);
    res.status(500).json({ error: error.message });  // Return detailed error
  }
};

const editVeterinaries = async (req, res) => {
  try {
    const {id}=req.params;
    const { name,email,contact,clinicName,clinicAddress,specialization,availability,location,experience,rating}=req.body.formValues
    const newVeterinary = await Veterinary.findByIdAndUpdate(id,{
      name,email,contact,clinicName,clinicAddress,specialization,availability,location,experience,rating
    },{
      new:true
    })
    res.status(201).json({ message: "Veterinary updated successfully",newVeterinary });
  } catch (error) {
    console.error("Error updating veterinary:", error);
    res.status(500).json({ error: error.message });  // Return detailed error
  }
};

const deleteVeterinaries = async (req, res) => {
  try {
    const {id}=req.params;
    const newVeterinary = await Veterinary.findByIdAndDelete(id,{
      new:true
    })
    res.status(201).json({ message: "Veterinary deleted successfully",newVeterinary });
  } catch (error) {
    console.error("Error delete veterinary:", error);
    res.status(500).json({ error: error.message });  // Return detailed error
  }
};

const manageVeterinaries = async (req, res) => {
  try {
      const Veterinaries = await Veterinary.find();
      res.status(200).json({ message: 'Veterinary  fetched successfully', Veterinaries });
  } catch (error) {
      console.error('Error fetching veterinary:', error);
      res.status(500).json({ message: 'Failed to fetch veterinary' });
  }
};

// add vaccination
const addVaccinations = async (req, res) => {
  try {
    console.log("🔍 Received data from frontend:", req.body);  // ✅ Debug log

    const { petId,petName, vaccineName, vaccinationDate, nextDueDate, vaccinationNotes } = req.body;

    if (!petName || !vaccineName) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newVaccination = await Vaccination.create({
      petId,petName, vaccineName, vaccinationDate, nextDueDate, vaccinationNotes
    });

    res.status(201).json({ message: "Vaccination added successfully", newVaccination });

  } catch (error) {
    console.error("Error saving vaccination:", error);
    res.status(500).json({ error: error.message });
  }
};



// const editVaccinations = async (req, res) => {
//   try {
//     const {id}=req.params;
//     const {  petName, vaccineName, vaccinationDate, nextDueDate, vaccinationNotes}=req.body.formValues
//     const newVaccination = await Vaccination.findByIdAndUpdate(id,{
//        petName, vaccineName, vaccinationDate, nextDueDate, vaccinationNotes
//     },{
//       new:true
//     })
//     res.status(201).json({ message: "Vaccination updated successfully",newVaccination });
//   } catch (error) {
//     console.error("Error updating vaccination:", error);
//     res.status(500).json({ error: error.message });  // Return detailed error
//   }
// };

// const deleteVaccinations = async (req, res) => {
//   try {
//     const {id}=req.params;
//     const newVaccination = await Vaccination.findByIdAndDelete(id,{
//       new:true
//     })
//     res.status(201).json({ message: "Vaccination deleted successfully",newVaccination });
//   } catch (error) {
//     console.error("Error delete vaccination:", error);
//     res.status(500).json({ error: error.message });  // Return detailed error
//   }
// };

const manageVaccinations = async (req, res) => {
  try {
      const vaccinations = await Vaccination.find();
      res.status(200).json({ message: 'Vaccination  fetched successfully', vaccinations });
  } catch (error) {
      console.error('Error fetching vaccination:', error);
      res.status(500).json({ message: 'Failed to fetch vaccination' });
  }
};

// settings
const getAdminDetails = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      console.log(`Admin with ID ${req.headers.id} not found.`);
      return res.status(404).json({
        success: false,
        message: "Admin not found.",
      });
    }

    console.log("Admin details fetched successfully:", admin);
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

const updateAdminDetails = async (req, res) => {
  const {  email, password,  } = req.body;
  const adminId = req.headers.id;

  if (!adminId) {
    return res.status(400).json({ success: false, message: "Admin ID is required" });
  }

  try {
    const foundAdmin = await User.findById(adminId);
    if (!foundAdmin) {
      return res.status(404).json({ success: false, message: "Admin not found" });
    }

    if (email && email !== foundAdmin.email) {
      const existingAdmin = await Admin.findOne({ email });
      if (existingAdmin) {
        return res.status(400).json({ success: false, message: "Email already in use" });
      }
    }

    const profilePicture = req.file
      ? `/uploads/${req.file.filename}`
      : `/uploads/default-profile.jpg`;

    const updatedAdmin = await User.findByIdAndUpdate(
      adminId,
      { email, password, profilePicture },
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

// Add pet dog
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
  const { name, breed, age, gender, adoptionStatus, description } = req.body;

  // Validate required fields
  if (!name || !breed || !age || !adoptionStatus || !gender) {
    console.log("Error: Missing required fields.");
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields (name, breed, age, gender, adoptionStatus).",
    });
  }

  try {
    // Handle profile picture upload
    const profilePicture = req.file
      ? `/uploads/${req.file.filename}`
      : `/uploads/default-profile.jpg`;

    // Create a new pet entry in the database
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


  // Edit pet details
  const editPetDog = async (req, res) => {
    try {
      const { petId } = req.params;
      let updatedData = {};
  
      // Extract only the fields that are provided in the request
      if (req.body.name) updatedData.name = req.body.name;
      if (req.body.breed) updatedData.breed = req.body.breed;
      if (req.body.age) updatedData.age = req.body.age;
      if (req.file) updatedData.image = req.file.filename; // Update only if a new image is uploaded
  
      // Check if there's any data to update
      if (Object.keys(updatedData).length === 0) {
        return res.status(400).json({ message: "No valid fields provided for update" });
      }
  
      // Find and update the pet
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
  
  

// Delete a pet dog
const deletePetDog = async (req, res) => {
  try {
    const { petId } = req.params;
    console.log("Received Pet ID:", petId); // Debugging

    // Ensure petId is a valid ObjectId
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


// Update pet adoption status
// const updatePetStatus = async (req, res) => {
//   try {
//   const { petId } = req.params;
//   const { status } = req.body;
  
//   const updatedPet = await Pet.findByIdAndUpdate(petId, { adoptionStatus: status }, { new: true });
//   if (!updatedPet) {
//   return res.status(404).json({ message: "Pet not found" });
//   }

//   res.status(200).json({ message: "Pet status updated successfully", pet: updatedPet });
//   } catch (error) {
//   res.status(500).json({ message: "Error updating pet status", error });
//   }
// };

// Manage pet Request
const managePetRequest = async (req, res) => {
  try {
      const petrequests = await PetRequest.find().populate('userId');
      res.status(200).json({ message: 'Requested dog fetched successfully', petrequests });
  } catch (error) {
      console.error('Error fetching requested dog:', error);
      res.status(500).json({ message: 'Failed to fetch requested dog' });
  }
};

const updateRequestStatus=async(req,res)=>{
const {petId}=req.params;
const {status}=req.body;
const updatedRequest=await PetRequest.findByIdAndUpdate(petId,{status:status},{new:true})
res.status(200).json({
  updatedRequest
})
}

const deletePetRequest=async(req,res)=>{
const {petId}=req.params;
const deletedRequest=await PetRequest.findByIdAndDelete(petId)
res.status(200).json({
  deletedRequest
})
}



module.exports = {
    adminLogin,
    manageDonations,
    updateStatus,
    deleteDonation,
    manageRescues,
    updateStatus1,
    deleteRescue,
    addVeterinaries,
    editVeterinaries,
    deleteVeterinaries,
    manageVeterinaries,
    manageVaccinations,
    getAdminDetails,
    updateAdminDetails,
    // addImage,
    // deleteImage,
    // updateImage,
    // getGallery,
    deletePetDog,
    editPetDog,
    addPetDog,
    managePetDog,
    deletePetRequest,
    updateRequestStatus,
    managePetRequest,
    addVaccinations,
    // manageGallery,    // managePets,
    // manageVeterinarians,
};
