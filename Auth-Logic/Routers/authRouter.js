import { Router } from "express";
import itValid from "../Vlidators/authValidator.js";
import controller from "../Controllers/authController.js";
// import { adminMiddleware }  from "../Middlewares/middelware.js";

const authRouter = new Router()

router.post('/login', controller.login)
router.post('/logout', controller.logout)
router.get('/refresh', controller.refreshToken)
router.get('/activate/:link', controller.activate)
router.post('/registration', itValid, controller.registration)
// router.get('/users', adminMiddleware(["Admin"]), controller.getUsers)

export default authRouter



  
  