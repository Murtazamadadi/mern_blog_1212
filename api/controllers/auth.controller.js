
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"

export const SingUp = async (req,res,next)=>{
    const {username,email,password}= req.body

    
    if(!username || !email || !password || username==="" || email==="" || password===""){
        next(errorHandler(404,"وارید کردن اطلاعات الزامی میبا شد"))
    }

    const hashPassword=bcrypt.hashSync(password,10)

    const newUser=new User({
        username,
        email,
        password:hashPassword
    })


    try{
        await newUser.save()
        res.json("کاربر با موفقیت ایجاد شد")
    }catch(err){
        next(err)
    }
}