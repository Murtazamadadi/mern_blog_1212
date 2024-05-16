import express from "express"
import { SingUp,SingIn,google } from "../controllers/auth.controller.js"

const route=express.Router()


route.post("/sign-up",SingUp)
route.post("/sign-in",SingIn)
route.post("/google",google)

export default route