const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// database connection
mongoose
  .connect("mongodb://localhost:27017/mern-todo", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("Mongodb error", error));

// schema and model
const todoSchema = new mongoose.Schema({
  text: String,
});
const Todo = mongoose.model("Todo", todoSchema);

// ✅ GET: Fetch all todos
app.get("/api/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// ✅ POST: Add a new todo
app.post("/api/todos", async (req, res) => {
  const { text } = req.body;
  const newTodo = new Todo({ text });
  await newTodo.save();
  res.json(newTodo);
});

// ✅ DELETE: Delete a todo
app.delete("/api/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.json({ message: "Todo Deleted" });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
