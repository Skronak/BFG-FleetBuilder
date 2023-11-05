import React, { useReducer } from "react";
import "./inputAddComponent.css";

export default function InputAddComponent({ handleCreate, placeholder, addLabel  }) {
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      task: ""
    }
  );

  const handleChange = evt => {
    setUserInput({ [evt.target.name]: evt.target.value });
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newTodo = { id: 0, task: userInput.task, completed: false };
      handleCreate(newTodo);
    setUserInput({ task: "" });
  };

  return (
    <form className="NewTodoForm" onSubmit={handleSubmit}>
      <input
        value={userInput.task}
        onChange={handleChange}
        id="task"
        type="text"
        name="task"
        placeholder={placeholder}
      />
      <button>{addLabel}</button>
    </form>
  );
}