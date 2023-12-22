import React, { useState } from "react";

import "./Row.css";
import {PlayerUnit} from "@/army";

interface Props {
    data: PlayerUnit,
    remove,
    update
}

function Row(props: Props) {

  const [isEditing, setIsEditing] = useState(false);

  const handleClick = evt => {
  };

  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = evt => {
    evt.preventDefault();
    toggleFrom();
  };

  let result;
  if (isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={handleUpdate}>
{/*
         <select value={task} onChange={handleChange}>
            <option value={data.name}>{data.name}-{data.cost} pts</option>
         </select>
*/}
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <li
          key={props.data.id}
        >
          {props.data.id}
        </li>
        <div className="Todo-buttons">
          <button onClick={toggleFrom}>
            <i className="fas fa-pen" />
          </button>
          <button onClick={handleClick}>
            <i id={props.data.id} className="fas fa-trash" />
          </button>
        </div>
      </div>
    );
  }
  return result;
}

export default Row;
