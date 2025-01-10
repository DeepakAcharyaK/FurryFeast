const express = require('express'); 
const app = express(); 
const cors=require('cors');
const connectDB=require('./config/dbconnection')

app.use(cors())

app.use(express.json())

connectDB()

app.post('/', (req, res) => {

});





const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});