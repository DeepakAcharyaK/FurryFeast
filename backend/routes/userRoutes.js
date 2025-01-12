const express = require('express');
const router = express.Router();

const userControllers=require('../controllers/userControllers')

router.post('/signup',userControllers.signup)

router.post('/login',userControllers.login)

router.get('/:id/gallery',userControllers.gallery)

module.exports = router;
