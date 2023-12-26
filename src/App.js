import React, { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); // Fixed case sensitivity

  // Function to add a new todo
  const handleAddTodo = () => {
    setTodos([...todos, inputText]);
    setInputText("");
  };

  // Function to toggle a todo's completion state
  const handleToggleComplete = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
  };

  // Function to delete a todo
  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <div className="ToDo">
      <h1>To Do List</h1>
      <input
        type="text"
        className="text"
        value={inputText} // Using inputText, not todo
        onChange={(e) => setInputText(e.target.value)}
        placeholder="What are you into right now?"
      />
      <button onClick={handleAddTodo} className="Button">
        Add
      </button>
      <ul className="ToDoList">
        {todos.map((todo, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                className="updateText"
                value={todo}
                onChange={(e) =>
                  setTodos(
                    todos.map((t, i) => (i === index ? e.target.value : t))
                  )
                }
                onBlur={() => setEditingIndex(null)}
              />
            ) : (
              <span>{todo.completed ? <strike>{todo}</strike> : todo}</span>
            )}
            {/* Removed duplicate todo rendering
            <button onClick={() => handleToggleComplete(index)}>
              {todo.completed ? "Undo" : "Complete"}
            </button> */}
            <button onClick={() => handleDeleteTodo(index)} className="Button">
              Delete
            </button>
            <button onClick={() => handleEditTodo(index)} className="Button">
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
