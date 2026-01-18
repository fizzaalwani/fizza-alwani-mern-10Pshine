import mongoose from 'mongoose'

const noteSchema=mongoose.Schema({
    title: String,
  content: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, {timestamps:true})

export default noteSchema