import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Button } from "antd";

import { Header } from "./components/header/header";
import { Navigation } from "./components/navigation/navigation";
import { ToDoItem } from "./components/todo-item/todo-item";
import { TodoList } from "./components/todo-list/todo-list";

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact path="/" />
        <Route exact path="/todo" component={TodoList} />
      </Switch>
    </BrowserRouter>
  );
};
