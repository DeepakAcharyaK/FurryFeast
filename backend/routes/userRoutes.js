const express = require('express');
const router = express.Router();

const userControllers=require('../controllers/userControllers')

router.post('/signup',userControllers.signup)

router.post('/login',userControllers.login)

router.get('/search',userControllers.search)

router.get('/gallery',userControllers.gallery)

router.post('/adddonation',userControllers.addDonation)

router.post('/addrescue',userControllers.addRescue)

router.get('/getuserdetails',userControllers.getUserDetails)

router.put('/updateuserdetails',userControllers.updateUserDetails)

router.get('/viewpets',userControllers.viewpets)

router.get('/pets/:id',userControllers.pets)

router.get('/vaccinations/:id',userControllers.vaccination)

router.get('/veterinary/:id',userControllers.veterinary)

router.put('/pets/:id/adopt',userControllers.adopt)

router.get('/viewveterinary',userControllers.viewveterinary)

// router.get('/logout',userControllers.logout)

// router.get('/:id/works',userControllers.works)



module.exports = router;
