import dotenv from "dotenv";
dotenv.config();
import pinoHttp from 'pino-http'
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";
import errorHandler from "./middlewares/error.middleware.js";
import authRouter from '../src/routes/auth.route.js'


connectDB();
app.use(pinoHttp({logger}))


app.use('/api/auth',authRouter)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
  res.send("hello from home page")
})

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
