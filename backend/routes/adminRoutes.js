const express=require('express');
const router=express.Router()
const adminController=require('../controllers/adminController');


router.post('/login',adminController.adminLogin)

router.get('/donations', adminController.manageDonations);

// router.post('/manage-donation', adminController.ManageDonation);

// router.post('/manage-volunteer', adminController.ManageVolunteer);

// router.post('/manage-rescue', adminController.ManageRescue);

// router.post('/manage-gallery', adminController.ManageGallery);

// router.post('/manage-pet-dog/:id', adminController.ManagePetDog);

// router.post('/manage-pet-request/:id', adminController.ManagePetRequest);

// router.post('/manage-vaccination/:id', adminController.ManageVaccination);

// router.post('/manage-veterinary/:id', adminController.ManageVeterinary);

module.exports = router;
