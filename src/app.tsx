import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Header } from './components/header/header';
import { TodoList } from './components/todo-list/todo-list';

export const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" />
      <Route exact path="/todo" component={TodoList} />
    </Switch>
  </BrowserRouter>
);
