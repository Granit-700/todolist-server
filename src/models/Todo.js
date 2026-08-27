import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  text: String,
  isDone: Boolean,
});

export const Todo = mongoose.model("Todo", todoSchema);
