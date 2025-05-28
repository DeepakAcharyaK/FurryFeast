const express=require('express');
const router=express.Router()
const adminController=require('../controllers/adminController');
const upload = require('../middlewares/upload');

//login✅
router.post('/login',adminController.adminLogin)

//manage rescue✅
router.get('/rescues', adminController.manageRescues);
router.delete('/rescues/delete/:rescueId', adminController.deleteRescue);
router.patch('/rescues/update-status/:rescueId', adminController.updateStatus1);

//settings✅
router.get('/getadmindetails',adminController.getAdminDetails)
router.put("/updatedetails",adminController.updateAdminDetails);

//gallery✅
router.get('/gallery',adminController.gallery);
router.delete('/gallery/delete/:id',adminController.deleteImage);
router.post('/gallery/add', upload.single('photo'), adminController.addImage);

//dontions✅
router.get('/donations', adminController.manageDonations);

//veterinaries✅
router.get('/veterinaries', adminController.manageVeterinaries);
router.post('/veterinaries/add', adminController.addVeterinaries);
router.put('/veterinaries/edit/:id', adminController.editVeterinaries);
router.delete('/veterinaries/delete/:id', adminController.deleteVeterinaries);

//vaccinations✅
router.get('/vaccinations', adminController.manageVaccinations);
router.delete('/vaccinations/delete/:id', adminController.deleteVaccinations);
router.put('/vaccinations/edit/:id', adminController.editVaccinations);

//manage pet ✅
router.get('/pets', adminController.managePetDog);
router.post('/pets',upload.single('image'),adminController.addPetDog);
router.delete('/pets/delete/:petId', adminController.deletePetDog);
router.put('/pets/edit/:petId',upload.single('image'),adminController.editPetDog);
router.post('/add/vaccinations/details/:id',adminController.addVaccinationDetails);

//manage pet requests
router.get('/petrequests', adminController.managePetRequest);
router.patch('/petrequests/update-status/:petId', adminController.updateRequestStatus);
router.delete('/petrequests/delete/:petId', adminController.deletePetRequest);

router.get("/dashboard-stats", adminController.getDashboardStats);

module.exports = router;
