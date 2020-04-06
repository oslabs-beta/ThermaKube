import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Cluster_Container from './containers/Cluster_Container';
import Visualizer from './containers/Visualizer_Container.jsx';
import Alerts from './containers/Alerts_Container.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='appContainer' id='app'>
          {/* <Dashboard /> */}
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/cluster' component={Cluster_Container} />
            <Route exact path='/visualizer' component={Visualizer} />
            <Route exact path='/alerts' component={Alerts} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
