import React, { useState } from "react";
import ReactDOM from "react-dom";
import Row from "./Row";
import NewTodoForm from "./NewTodoForm";
import uuid from "uuid";
import "./TodoList.css";
import InputField from "./components/InputField"

function TodoList(props) {
  const [todos, setTodos] = useState([
    { id: uuid(), task: "task 1", completed: false },
    { id: uuid(), task: "task 2", completed: true }
  ]);

  const create = newTodo => {
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const remove = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const update = (id, updtedTask) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const todosList = todos.map(todo => (
    <Row
      toggleComplete={toggleComplete}
      update={update}
      remove={remove}
      key={todo.id}
      todo={todo}
    />
  ));

  return (
    <div className="">
      <h1>
        Warband - {this.props.warband}
      </h1>
      <InputField className={"fleet-name"}>Son of Areus</InputField>
      <ul>{todosList}</ul>
      <NewTodoForm createRow={create} />
    </div>
  );
}

export default TodoList;
