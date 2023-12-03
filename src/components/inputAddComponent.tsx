import React, { useReducer } from "react";
import "./inputAddComponent.css";

interface Props {
    placeholder?: string;
    handleChange: () => void;
    withButton?: boolean;
    buttonLabel?: string;
    handleClickButton?: () => void;
}

export default function InputAddComponent(props: Props) {
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
      props.handleClickButton(newTodo);
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
        placeholder={props.placeholder? props.placeholder : ''}
      />
        {props.withButton && <button onClick={props.handleClickButton}>{props.buttonLabel}</button>}
    </form>
  );
}