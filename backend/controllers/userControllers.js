const express=require('express')
const app=express()
const User=require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const CookieParser=require('cookie-parser')

app.use(CookieParser())

const signup = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password,Number(process.env.SALT_ROUND));
  
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
  
      console.log(newUser);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
};

const login=async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = jwt.sign({ 
            id: user._id, 
            email: user.email 
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      console.log(token)
  
      // Send token in HTTP-only cookie
      res.cookie("token", 'token')
      res.status(200).json({ message: "Login successful" });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Server error" });
    }
};

module.exports={
    signup,login
}


