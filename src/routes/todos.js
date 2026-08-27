import express from "express";
import {
  createdTodo,
  deleteTodo,
  deleteTodos,
  getTodos,
  updateTodo,
} from "../controllers/todos";

const router = express.Router();

router.get("/", getTodos);

router.post("/", createdTodo);

router.patch("/:id", updateTodo);

router.delete("/:id", deleteTodo);

router.delete("/", deleteTodos);

export default router;
