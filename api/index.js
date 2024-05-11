import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRouter from "./routes/user.route.js"

dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDB connected")
}).catch((err)=>{
    console.log(err)
})

const app=express()

app.use(express.json())

app.use("/api/user",userRouter)

app.listen(3000,()=>{
    console.log("server is running on port 3000")
})