import mongoose from "mongoose";

const userShcema=mongoose.Schema(
    {
    
        username: {
          type: String,
          required: true,
          unique: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
        },
        password: {
          type: String,
          required: true,
        },
      },
      { timestamps: true }
)

const User=mongoose.model("User",userShcema)
export default User