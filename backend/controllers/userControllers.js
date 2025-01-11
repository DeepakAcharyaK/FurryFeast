const bcrypt = require('bcrypt');
const User=require('../models/userModel')

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



module.exports={
    signup,login
}


