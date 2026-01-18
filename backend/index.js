import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connection.js'
dotenv.config()

const app=express()
connectDB()

app.get('/',(req,res)=>{
    res.send("home page")
})

app.listen(process.env.PORT,()=>{
    console.log(`server running at port ${process.env.PORT}`)
})
