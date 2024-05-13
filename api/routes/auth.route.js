import express from "express"
import { SingUp,SingIn } from "../controllers/auth.controller.js"

const route=express.Router()


route.post("/sign-up",SingUp)
route.post("/sign-in",SingIn)

export default route