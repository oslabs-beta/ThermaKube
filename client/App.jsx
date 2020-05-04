import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Cookies from 'js-cookie';

import Dashboard from './components/Dashboard.jsx';
import Main_Container from './containers/Main_Container';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Eks from './components/Eks.jsx';
import Cluster_Container from './containers/Cluster_Container.jsx';

const App = () => {
  // set an initial auth value into local storage in order to persist auth data
  const initialCheck = () => window.localStorage.getItem('auth') || null;
  const [mainCont, setMainCont] = useState();
  const [isLoggedIn, setIsLoggedIn] = useState(initialCheck);

  // set local storage auth value to true - values in local storage are strings
  const isAuthed = () => {
    setIsLoggedIn('true');
  };
  // remove auth from local storage
  const removeAuth = () => {
    setIsLoggedIn('false');
  };

  useEffect(() => {
    // set isLoggedIn in local storage
    window.localStorage.setItem('auth', isLoggedIn);
    // values in local storage are strings
    if (isLoggedIn == 'true') {
      //if token exists, render cluster page paths
      setMainCont(
        <Route
          path='/'
          children={(routeProps) => (
            <Main_Container {...routeProps} path={path} />
          )}
        />
      );
    } else {
      //else login path
      setMainCont(
        <Route
          exact
          path='/login'
          component={() => <Login isAuthed={isAuthed} />}
        />
      );
    }
  }, [isLoggedIn]);

  //get current pathname for each
  const path = window.location.pathname;
  return (
    <Router>
      <Dashboard
        isLoggedIn={isLoggedIn}
        isAuthed={isAuthed}
        removeAuth={removeAuth}
      />
      <div className='appContainer' id='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route exact path='/login' component={Login} /> */}
          <Route exact path='/eks' component={Eks} />
          {mainCont}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
