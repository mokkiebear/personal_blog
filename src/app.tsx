import React from "react";
import { Button } from "antd";

import { Header } from "./components/header/header";
import { Navigation } from './components/navigation/navigation';

export const App = () => {
  return (
    <div>
      <Header />
      <Navigation />
    </div>
  );
};
