import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import todosRouter from "./routes/todos";
import usersRouter from "./routes/users";

const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URI;

const app = express();

app.use(cors());
app.use(express.json());
app.use("/users", usersRouter);
app.use("/api/todos", todosRouter);

async function main() {
  try {
    await mongoose.connect(URI);
    app.listen(PORT, () => {
      console.log(`Сервер запущен на http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error(e.message || e);
  }
}

main();
