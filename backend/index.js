import express from 'express'
import dotenv from 'dotenv'
import PinoHttp, { pinoHttp } from 'pino-http'
import logger from './src/config/logger.js'
import connectDB from './src/db/connection.js'
import authRoute from './src/routes/auth.route.js'
import errorHandler from './src/middlewares/error.middleware.js'
dotenv.config()

const app=express()

connectDB()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(pinoHttp({logger}))


app.use('/api/auth',authRoute)

app.use(errorHandler)

app.get('/',(req,res)=>{
    res.send("home page")
})

app.listen(process.env.PORT,()=>{
    console.log(`server running at port ${process.env.PORT}`)
})
