import mongoose from 'mongoose'

const connectDB=async()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/notes")
        console.log("Mongodb connected successfully")

    }catch(err){
        console.log("Database connection error : ",err.message)
        process.exit(1)
    }
}

export default connectDB