import React, { Component } from 'react';
import Dashboard from './containers/Dashboard';
import Main_Container from './containers/Main_Container';


class App extends Component {
  render() {
	return (
	  <div className="appCont" id='app'>
		<div className="dashCol">
		  <Dashboard />
		</div>
		<div className="mainCol">
		  <Main_Container />
		</div>
		</div>
	);
  }
}

export default App;
