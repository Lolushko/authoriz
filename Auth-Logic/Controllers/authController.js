import Jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import authServise from "../Services/authServise.js";
import ApiError from "../../Api-error/exeptions/api-error.js";

class AuthControllers {

  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw ApiError.BadRequest('Validation error', errors.array())
      };
      const { username, password, email } = req.body;
      await authServise.userRegistartion(username, password, email);
      return res.status(200).json({ message: 'registration is correct' });
    } catch (err) {
      next(err)
    }
  }

  async login(req, res, next) {
    try { 
      const { username, password } = req.body
      const login = await authServise.loginUser(username, password)
      if (login === 'User is not found') {
        throw ApiError.BadRequest(login)
      } else if (login === 'invalid password') {
        throw ApiError.BadRequest(login)
      } 
      const { accessToken, refreshToken, user } = login
      res.cookie('refreshToken', refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true }) 
      res.setHeader('accessToken', accessToken)
      res.json({ message: user })
    } catch (err) {
      next(err)
    } 
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await authServise.activate(activationLink)
      return res.redirect(process.env.CLIENT_URL)
     } catch (err) {
      next(err)
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const { id } = Jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      const logout = await authServise.logout(id, refreshToken)
      res.clearCookie('refreshToken', { httpOnly: true })
      res.status(200)
    } catch (err) {
      next(err)
    }
  }

  async getUsers(req, res) {
    try {
      const users = await authServise.getAllUsers()
      res.status(200).json({ users })
    } catch (err) {
      next(err)
    }
  }

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.cookies
      const { id } = Jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
      const token = await authServise.refreshToken(id, refreshToken)
      res.setHeader('accesToken', token)
      res.status(200).json({ message: 'ok' })
    } catch (err) {
      next(ApiError.BadRequest('refresh token problem', err))
    }
  }
}

export default new AuthControllers()