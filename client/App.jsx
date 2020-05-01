import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Cookies from 'js-cookie';

import Dashboard from './components/Dashboard.jsx';
import Main_Container from './containers/Main_Container';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Eks from './components/Eks.jsx';


const App = () => {
  let [mainCont, setMainCont] = useState();

  useEffect(() => {
    const token = Cookies.get('token'); //undefined if not logged in
    // const showCluster;
    if(token) {
      setMainCont(
        <Route
          path='/'
          children={(routeProps) => (
            <Main_Container {...routeProps} path={path} />
          )}
        /> 
      );
      console.log('token verified, setMainCont')
    }
    console.log('useEffect called')
    console.log('token in app', token)
  }, [])


  //get current pathname for each
  const path = window.location.pathname;
  return (
    <Router>
      <Dashboard />
      <div className='appContainer' id='app'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/eks' component={Eks} />
          {/* <Route
            path='/'
            children={(routeProps) => (
              <Main_Container {...routeProps} path={path} />
            )}
          /> */}
          {mainCont}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
