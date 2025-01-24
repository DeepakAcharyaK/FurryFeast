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

// // Manage Rescue Requests
// const manageRescueRequests = async (req, res) => {
//     try {
//         const rescues = await Rescue.find();
//         res.status(200).json({ message: 'Rescue requests fetched successfully', rescues });
//     } catch (error) {
//         console.error('Error fetching rescue requests:', error);
//         res.status(500).json({ message: 'Failed to fetch rescue requests' });
//     }
// };

// // Update Gallery
// const updateGallery = async (req, res) => {
//     const { id, title, imageUrl, description } = req.body;

//     // Validation
//     if (!id || !title || !imageUrl || !description) {
//         return res.status(400).json({ message: 'All fields are required to update gallery' });
//     }

//     try {
//         const updatedGallery = await Gallery.findByIdAndUpdate(
//             id,
//             { title, imageUrl, description },
//             { new: true, runValidators: true }
//         );

//         if (!updatedGallery) {
//             return res.status(404).json({ message: 'Gallery entry not found' });
//         }

//         res.status(200).json({ message: 'Gallery updated successfully', updatedGallery });
//     } catch (error) {
//         console.error('Error updating gallery:', error);
//         res.status(500).json({ message: 'Failed to update gallery' });
//     }
// };

// // Manage Pets
// const managePets = async (req, res) => {
//     try {
//         const pets = await Pet.find();
//         res.status(200).json({ message: 'Pets fetched successfully', pets });
//     } catch (error) {
//         console.error('Error fetching pets:', error);
//         res.status(500).json({ message: 'Failed to fetch pets' });
//     }
// };

// // Manage Veterinarians
// const manageVeterinarians = async (req, res) => {
//     try {
//         const veterinarians = await Veterinary.find();
//         res.status(200).json({ message: 'Veterinarians fetched successfully', veterinarians });
//     } catch (error) {
//         console.error('Error fetching veterinarians:', error);
//         res.status(500).json({ message: 'Failed to fetch veterinarians' });
//     }
// };

// Export all controllers
module.exports = {
    adminLogin,
    manageDonations,
    updateStatus,
    deleteDonation
    // manageRescueRequests,
    // updateGallery,
    // managePets,
    // manageVeterinarians,
};
