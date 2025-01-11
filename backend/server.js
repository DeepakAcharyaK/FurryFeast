const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/dbconnection');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');


dotenv.config();


// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
connectDB()
  .then(() => {
    app.use('/user', userRoutes);
    // app.use('/admin', adminRoutes);

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error.message);
    process.exit(1);
  });
