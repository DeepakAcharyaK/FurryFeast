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

router.get('/vaccinations', adminController.manageVaccinations);

router.post('/vaccinations/add', adminController.addVaccinations);

// router.put('/vaccinations/edit/:id', adminController.editVaccinations);

// router.delete('/vaccinations/delete/:id', adminController.deleteVaccinations);

router.get('/pets', adminController.managePetDog);

router.post('/pets',upload.single('photo'),adminController.addPetDog);

router.delete('/pets/delete/:petId', adminController.deletePetDog);

router.put('/pets/edit/:petId',adminController.editPetDog);

router.get('/petrequests', adminController.managePetRequest);

router.patch('/petrequests/update-status/:petId', adminController.updateRequestStatus);

router.delete('/petrequests/delete/:petId', adminController.deletePetRequest);



module.exports = router;
