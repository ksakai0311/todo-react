import "./styles.css";
import React, { useState } from "react";
import { InputTodo } from "./componets/InputTodo";
import { IncompleteTodos } from "./componets/IncompleteTodos";
import { CompleteTodos } from "./componets/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);
  const onClickAdd = () => {
    if (todoText === "") return;
    const newTools = [...incompleteTodos, todoText];
    setIncompleteTodos(newTools);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    //要素を完了に追加
    const newCompTodos = [...completeTodos, incompleteTodos[index]];
    setCompleteTodos(newCompTodos);

    //未完了から要素削除
    const newInCompTodos = [...incompleteTodos];
    newInCompTodos.splice(index, 1);
    setIncompleteTodos(newInCompTodos);
  };

  const onClickBack = (index) => {
    //要素を未完了に追加
    const newInCompTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newInCompTodos);

    //完了から要素削除
    const newCompTodos = [...completeTodos];
    newCompTodos.splice(index, 1);
    setCompleteTodos(newCompTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>TODOは５個までです！</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
