import React, { Component } from "react";
import Dashboard from "./containers/Dashboard";
import Main_Container from "./containers/Main_Container";

class App extends Component {
  render() {
    return (
      <div id="app">
        {/* <Dashboard /> */}
        <Main_Container />
      </div>
    );
  }
}

export default App;
