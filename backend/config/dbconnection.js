const mongoose=require('mongoose')

const connectDB=async()=>{
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
        console.log('Database connected successfully...')
    } catch (error) {
        console.log("Error in connecting database!!!",error)
    }
}

module.exports=connectDB