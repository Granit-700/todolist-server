import express from "express";
import { Todo } from "../models/Todo";

const router = express.Router();

router.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

router.post("/api/todos", async (req, res) => {
  const { text } = req.body;

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Text is required" });
  }

  const newTodo = {
    text: text.trim(),
    isDone: false,
  };

  const createdTodo = await Todo.create(newTodo);

  res.status(201).json(createdTodo);
});

router.patch("/api/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { text, isDone } = req.body;

  if (text !== undefined) {
    if (!text.trim()) {
      return res.status(400).json({ error: "Text cannot be empty" });
    }
  }

  const updates = {};
  if (text !== undefined) updates.text = text.trim();
  if (isDone !== undefined) updates.isDone = isDone;

  const updated = await Todo.findByIdAndUpdate(
    id,
    { $set: updates },
    { new: true },
  );

  if (!updated) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(updated);
});

router.delete("/api/todos/:id", async (req, res) => {
  const id = req.params.id;

  const deleted = await Todo.findByIdAndDelete(id);

  if (!deleted) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.json(deleted);
});

router.delete("/api/todos", async (req, res) => {
  const result = await Todo.deleteMany();

  res.json({
    message: "All todos deleted",
    count: result.deletedCount,
  });
});
