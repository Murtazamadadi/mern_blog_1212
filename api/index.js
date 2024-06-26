import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
import cookieParser from "cookie-parser"

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDB connected")
}).catch((err)=>{
    console.log(err)
})

const app=express()

app.use(express.json())
app.use(cookieParser())

app.use("/api/user",userRouter)
app.use("/api/auth",authRouter)




app.listen(3000,()=>{
    console.log("server is running on port 3000")
})


// === Middleware for error handling======================
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});
  