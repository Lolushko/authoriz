import mongoose from "mongoose";

const { Schema, model } = mongoose

const Token = new Schema({
  refreshToken: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: "User" }
})

export default model('Token', Token)

  
