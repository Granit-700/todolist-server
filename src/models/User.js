import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
});

export const User = mongoose.model("User", userSchema);
