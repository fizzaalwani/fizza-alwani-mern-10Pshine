import dotenv from "dotenv";
dotenv.config();
import express from 'express'
import cors from 'cors'
// import errorHandler from "./middlewares/error.middleware.js";
// import authRouter from '../src/routes/auth.route.js'
// import userRouter from '../src/routes/user.route.js'
// import noteRouter from  '../src/routes/note.route.js'

const app=express()

app.use(cors())
app.use(express.json())



//for testing
// app.use('/api/auth',authRouter)
// app.use('/api/user',userRouter)
// app.use('/api/notes',noteRouter)
// app.use(errorHandler)

export default app