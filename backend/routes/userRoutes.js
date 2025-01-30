const express = require('express');
const router = express.Router();


const userControllers=require('../controllers/userControllers');

const upload = require('../middlewares/upload');

router.post('/signup',userControllers.signup)

router.post('/login',userControllers.login)

router.get('/search',userControllers.search)

router.get('/gallery',userControllers.gallery)

router.post('/adddonation',userControllers.addDonation)

router.get('/donations/:userid',userControllers.displayDonation) 

router.patch('/donation/:donationid/update',userControllers.updateDonation) 

router.get('/payment/:userid',userControllers.displayPayment) 

router.get('/getdonationdets/:donationid',userControllers.getDonation)

router.post('/addrescue',upload.single('image'),userControllers.addRescue)

router.get('/rescue/:userid',userControllers.rescueinfoPets)

router.get('/rescued/:userid',userControllers.rescuedPets)

router.get('/getuserdetails',userControllers.getUserDetails)

router.put("/updateuserdetails", upload.single("avatar"), userControllers.updateUserDetails);

router.get('/viewpets',userControllers.viewpets)

router.get('/pets/:id',userControllers.pets)

router.get('/adoptedPets/:userid',userControllers.getUserAdoptedPets)

router.get('/vaccinations/:id',userControllers.vaccination)

router.get('/veterinary/:id',userControllers.veterinary)

router.put('/:userid/pets/:id/adopt',userControllers.adopt)

router.get('/viewveterinary',userControllers.viewveterinary)

router.post('/payment/save',userControllers.payment)

router.post('/generate-invoice',userControllers.generateInvoice)

router.get('/rescues',userControllers.allWorks)

router.put('/rescues/:id/take/:userid',userControllers.manageWork)

router.patch('/rescue/:rescueid',userControllers.manageStatus)

// router.get('/logout',userControllers.logout)

// router.get('/:id/works',userControllers.works)



module.exports = router;
