const express = require('express');
const router = express.Router();

const userControllers=require('../controllers/userControllers')

router.post('/signup',userControllers.signup)

router.post('/login',userControllers.login)

router.get('/gallery',userControllers.gallery)

router.post('/adddonation',userControllers.addDonation)

// router.post('/:id/addrescue',userControllers.addrescue)

// router.get('/:id/adopt',userControllers.adopt)

// router.get('/:id/works',userControllers.works)



module.exports = router;
