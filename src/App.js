import "./Styles/App.css";
import React, { Component } from "react";
import { Header } from "./blocks/Header";
import { Main } from "./blocks/Main";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Header logoImageUrl="../src/components/Logo.svg"></Header>
        <Main></Main>
      </div>
    );
  }
}

export default App;
