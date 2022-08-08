import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from 'uuid';
import User from "../Models/user.js";
import Token from "../Models/token.js";
import UserDTO from "../dto/userDTO.js";
import MailService from "./emailService.js";
import TokenService from "./tokenService.js";
import ApiError from "../exeptions/api-error.js";

class AuthServise {

  async userRegistartion(username, password, email) {  
    const condidateName = await User.findOne({ email });
    const condidateEmail = await User.findOne({ username })
    if (condidateName) {
      throw ApiError.BadRequest(`user with email address ${email} already exists`)
    } 
    if (condidateEmail) {
      throw ApiError.BadRequest(`user named ${username} already exists`)
    };

    const hashPassword = bcrypt.hashSync(password, 5);
    const activationLink = uuidv4() 

    const user = new User({ username, email, password: hashPassword, activationLink });
    await MailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`) 
    await user.save()
    return true;
  };

  async loginUser(username, password) {
    const user = await User.findOne({ username })
    if (!user) {
      return 'User is not found'
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return 'invalid password'
    }
    const userDto = new UserDTO(user)
    const tokens = TokenService.generationToken({ ...userDto })
    await TokenService.saveToken(userDto.id, tokens.refreshToken) 
    return { ...tokens, user: userDto }
  }
  
  async getAllUsers() {
    return await User.find()
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink })
    if (!user) {
      throw ApiError.BadRequest ('invalid activation link')
    }
    user.isActivated = true 
    delete user.activationLink
    await user.save()
  }

  async logout(userId) {
    await Token.deleteOne({ user: userId })
  }

  async refreshToken(userId, refreshToken) {
    try {
    const token = await Token.findOne({ refreshToken })
    if (!token) {
      throw ApiError.BadRequest('refresh tokens do not match')
    } 
    const user = User.findOne({ userId })
    const userDto = new UserDTO(user)
    const tokens = TokenService.generationToken({ ...userDto })
    return tokens.accessToken
    } catch (err) {
      return err
    }
  }
}; 

export default new AuthServise()