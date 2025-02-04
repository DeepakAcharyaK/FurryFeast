const express=require('express');
const router=express.Router()
const adminController=require('../controllers/adminController');

const upload = require('../middlewares/upload');

router.post('/login',adminController.adminLogin)

router.get('/donations', adminController.manageDonations);

router.patch('/donations/update-status/:donationId', adminController.updateStatus);

router.delete('/donations/delete/:donationId', adminController.deleteDonation);

router.get('/rescues', adminController.manageRescues);

router.patch('/rescues/update-status/:rescueId', adminController.updateStatus1);

router.delete('/rescues/delete/:rescueId', adminController.deleteRescue);

router.get('/getadmindetails/:id',adminController.getAdminDetails)

router.put("/updateadmindetails", upload.single("avatar"), adminController.updateAdminDetails);

router.get('/Veterinaries', adminController.manageVeterinaries);

router.post('/Veterinaries/add', adminController.addVeterinaries);

router.put('/veterinaries/edit/:id', adminController.editVeterinaries);

router.delete('/veterinaries/delete/:id', adminController.deleteVeterinaries);

router.get('/Vaccinations', adminController.manageVaccinations);

router.post('/Vaccinations/add', adminController.addVaccinations);

router.put('/vaccinations/edit/:id', adminController.editVaccinations);

router.delete('/vaccinations/delete/:id', adminController.deleteVaccinations);

router.get('/pets', adminController.managePetDog);

router.post('/pets',upload.single('photo'),adminController.addPetDog);


module.exports = router;
