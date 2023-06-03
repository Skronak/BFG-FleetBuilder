import React, { useState } from 'react';
import Row from "./Row";
import NewTodoForm from "./NewTodoForm";
import uuid from "uuid";
import "./TodoList.css";
import InputField from "./components/InputField"

interface Props {
  warband: string;
}

function TodoList({warband}: Props) {
  const [todos, setTodos] = useState([
    { id: uuid.v1(), task: "task 1", completed: false },
    { id: uuid.v1(), task: "task 2", completed: true }
  ]);

  const create = (newTodo: { id: string; task: string; completed: boolean; }) => {
    console.log(newTodo);
    setTodos([...todos, newTodo]);
  };

  const remove = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const update = (id: string, updtedTask: any) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const toggleComplete = (id: string) => {
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
    <div>
      <h1>
        create Warband ({warband})
      </h1>
      <InputField subClass='nom' />
      <ul>{todosList}</ul>
      <NewTodoForm createRow={create} />
    </div>
  );
}

export default TodoList;
