import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

let todos = [
  {
    id: 1,
    text: "server",
    isDone: true
  },
];
let nextId = 2;

// GET - получить все задачи
app.get('/api/todos', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 260)); // latency

  res.json(todos);
});

// POST - создать задачу
app.post('/api/todos', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 260)); // latency
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newTodo = {
    id: nextId++,
    text: text.trim(),
    isDone: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PATCH - обновить задачу (частично)
app.patch('/api/todos/:id', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 260)); // latency

  const id = parseInt(req.params.id);
  const { text, isDone } = req.body;

  const todo = todos.find(t => t.id === id);

  if (!todo) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  // Обновляем только переданные поля
  if (text !== undefined) {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return res.status(400).json({ error: 'Text cannot be empty' });
    }
    todo.text = trimmedText;
  }

  if (isDone !== undefined) {
    todo.isDone = isDone;
  }

  res.json(todo);
});

// DELETE - удалить одну задачу
app.delete('/api/todos/:id', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 260)); // latency

  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  const deleted = todos.splice(index, 1)[0];
  res.json(deleted);
});

// DELETE - удалить все задачи
app.delete('/api/todos', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 80 + Math.random() * 260)); // latency

  const count = todos.length;
  todos = [];
  res.json({ message: 'All todos deleted', count });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
