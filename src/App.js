import "./App.css";
import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [checked, setChecked] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTodo = () => {
    setTodos([...todos, inputText]);
    setInputText("");
  };

  const handleCheck = (index) => {
    const updatedList = [...checked];
    const isChecked = updatedList.includes(index);
    if (isChecked) {
      updatedList.splice(updatedList.indexOf(index), 1);
    } else {
      updatedList.push(index);
    }
    setChecked(updatedList);
  };

  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  const handleEditTodo = (index) => {
    setEditingIndex(index);
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <div className="ToDo">
      <h1>To Do List</h1>
      <input
        type="text"
        className="textAdd"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Capture your goals for the day."
      />
      <button onClick={handleAddTodo} className="Button">
        Add
      </button>
      <ul className="list-container">
        {todos.map((item, index) => (
          <li key={index}>
            {editingIndex === index ? (
              <input
                type="text"
                className="updateText"
                value={item}
                onChange={(e) =>
                  setTodos(
                    todos.map((t, i) => (i === index ? e.target.value : t))
                  )
                }
                onBlur={() => setEditingIndex(null)}
              />
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={checked.includes(index)}
                  onChange={() => handleCheck(index)}
                />
                <span className={isChecked(index)}>{item}</span>
              </>
            )}
            <button onClick={() => handleEditTodo(index)} className="Button">
              Update
            </button>
            <button onClick={() => handleDeleteTodo(index)} className="Button">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
