import { check } from "express-validator";

export default [
  check('username', "username cannot be emty").notEmpty(),
  check('password', "password must be more than 8 characters").isLength({ min: 8 , max: 32}),
  check('email', "email is not in the correct format").isEmail()
]












