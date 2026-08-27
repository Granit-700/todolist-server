import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const PORT = process.env.PORT || 3000;
const URI = process.env.DB_URI;

const app = express();

app.use(cors());
app.use(express.json());

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
