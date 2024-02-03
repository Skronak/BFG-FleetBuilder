import React, {useEffect, useState} from "react";

import "./Row.css";
import {PlayerUnit, UnitRef} from "@/army";

interface Props {
  remove,
  edit,
  unit: UnitRef,
}

export function Row(props: Props) {

  useEffect(() => {
  }, []);

  return (
    <div className="Todo">
      <li key={props.unit.id}></li>
      <p>{props.unit.name}</p>
      <p>{props.unit.cost}</p>

      <div className="Todo-buttons">
        <button onClick={props.edit(props.unit)}>edit
          <i className="fas fa-trash"/>
        </button>

      </div>
    </div>
  );
}

export default Row