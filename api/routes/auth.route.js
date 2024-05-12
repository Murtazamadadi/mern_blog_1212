import express from "express"
import { SingUp } from "../controllers/auth.controller.js"

const route=express.Router()


route.post("/sign-up",SingUp)

export default route