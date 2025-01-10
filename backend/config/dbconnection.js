const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/FurryFeast")
        console.log('Database connected successfully...')
    } catch (error) {
        console.log("Error in connecting database!!!")
    }
}

module.exports=connectDB