import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard.jsx';
import Main_Container from './containers/Main_Container';

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Eks from './components/Eks.jsx';

const App = () => {
  //get current pathname for each
  const path = window.location.pathname;
  return (
    <Router>
      <div className='appContainer' id='app'>
        {/* if path is not to login or eks, render dashboard*/}
        {path !== '/login' && path !== '/eks' && <Dashboard />}
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/eks' component={Eks} />
          <Route path='/' children={<Main_Container path={path} />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
