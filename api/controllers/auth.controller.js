
import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

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


// ==================================================================Sign in

export const SingIn = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'وارید کردن همه اطلاعات الزامی می باشذ'));
    }
  
    try {
      const validUser = await User.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, 'کاربر پیدا نشد'));
      }
      const validPassword = bcrypt.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'رمز عبور اشتباه می باشد'));
      }
      const token = jwt.sign(
        { id: validUser._id, isAdmin: validUser.isAdmin },
        process.env.JWT_SECRET
      );
  
      const { password: pass, ...rest } = validUser._doc;
  
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
    } catch (error) {
      next(error);
    }
  };
  