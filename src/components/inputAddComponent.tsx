import React, {useReducer, useState} from "react";
import "./inputAddComponent.css";

interface Props {
    placeholder?: string;
    handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    withButton?: boolean;
    buttonLabel?: string;
    handleClickButton?: () => void;
}

export default function InputAddComponent(props: Props) {
  const [userInput, setUserInput] = useState("");

  const onChange = (val: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(val.target.value);
    props.handleChange(val);
  }

  return (
    <form className="NewTodoForm">
      <input
        value={userInput}
        onChange={onChange}
        id="task"
        type="text"
        name="task"
        placeholder={props.placeholder? props.placeholder : ''}
      />
        {props.withButton && <button onClick={props.handleClickButton}>{props.buttonLabel}</button>}
    </form>
  );
}