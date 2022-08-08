import mongoose from "mongoose";

const { Schema, model } = mongoose

const User = new Schema({
  email: { type: String, unique: true },
  roles: [{ type: String, ref: 'Role' }],
  password: { type: String, required: true }, 
  isActivated: { type: Boolean, default: false},
  activationLink: { type: String, required: true },
  username: { type: String, unique: true, required: true },
})

export default model('User', User)