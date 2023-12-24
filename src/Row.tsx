import React, {useEffect, useState} from "react";

import "./Row.css";
import {PlayerUnit, Unit} from "@/army";

interface Props {
    remove,
    update,
    unit: Unit,
}

function Row(props: Props) {

  const [isEditing, setIsEditing] = useState(false);

  const handleClick = evt => {
  };

    useEffect(() => {
    }, []);

  let result;
  if (isEditing) {
    result = (
      <div className="Todo">
        <form className="Todo-edit-form" onSubmit={props.update}>
          <button>Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div className="Todo">
        <li key={props.unit.id}></li>
          <p>{props.unit.name}</p>
          <p>{props.unit.cost}</p>
        <div className="Todo-buttons">


      <button onClick={handleClick}>
        <i className="fas fa-trash" />
      </button>
        </div>
      </div>
    );
  }
  return result;
}

export default Row;
