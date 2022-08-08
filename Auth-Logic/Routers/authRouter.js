import { Router } from "express";
import itValid from "../Vlidators/authValidator.js";
import controller from "../Controllers/authController.js";

const authRouter = new Router()

authRouter.post('/login', controller.login)
authRouter.post('/logout', controller.logout)
authRouter.get('/refresh', controller.refreshToken)
authRouter.get('/activate/:link', controller.activate)
authRouter.post('/registration', itValid, controller.registration)

export default authRouter



  
  