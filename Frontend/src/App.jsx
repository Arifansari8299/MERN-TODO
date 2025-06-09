import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:5000/api/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.log("Failed to fetch todos", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  async function addTodo(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await res.json();
    setTodos((prev) => [...prev, newTodo]);
    setText("");
  }

  const deleteTodo = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setTodos((prev) => prev.filter((todo) => todo._id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-5">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6 transition-transform duration-300 hover:scale-[1.01]">
        <h1 className="text-2xl font-bold text-center mb-4 text-blue-700">📝 MERN Todo App</h1>
        
        <form onSubmit={addTodo} className="flex mb-6">
          <input
            type="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Enter todo"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        <ul>
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="mt-3 bg-gray-100 p-3 flex justify-between items-center rounded shadow-sm hover:shadow-md transition duration-200"
            >
              <span className="text-gray-800">{todo.text}</span>
              <button
                onClick={() => deleteTodo(todo._id)}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
