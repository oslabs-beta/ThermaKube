import React, { useEffect, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';

import white from '../assets/whiteLogo.png';
import Cookies from 'js-cookie';

const Dashboard = ({ isLoggedIn, removeAuth }) => {
  const [navOption, setNavOption] = useState([]);
  // remove cookie w/ token when users sign out and update auth value in local storage
  const signOut = () => {
    Cookies.remove('token');
    removeAuth();
  };
  useEffect(() => {
    if (isLoggedIn == 'true') {
      //if logged in, show cluster option in dashboard
      setNavOption(
        <>
          <NavDropdown title='My Cluster' className='ml-auto navLink'>
            <Nav.Link href='/cluster'>Cluster</Nav.Link>
            <Nav.Link href='/visualizer'>Visualizer</Nav.Link>
            <Nav.Link href='/alerts'>Alerts</Nav.Link>
          </NavDropdown>
          <Nav.Link href='/login' className='navLink' onClick={signOut}>
            Sign Out
          </Nav.Link>
        </>
      );
    } else {
      setNavOption(
        //login option shows only if not logged in - for now, since no logout in backend
        <Nav.Link href='/login' className='ml-auto'>
          Login
        </Nav.Link>
      );
    }
  }, [isLoggedIn]);

  return (
    <div className='topNavbar'>
      <Nav
        defaultActiveKey=''
        className='justify-content-between'
        id='navbarHome'
      >
        <Nav.Item>
          <Nav.Link href='/' className='dashLogo'>
            <img src={white} alt='Logo' className='logoHome' />
          </Nav.Link>
        </Nav.Item>
        <Nav.Link href='/#features' className='navLink'>
          Features
        </Nav.Link>
        <Nav.Link href='/#contribute' className='navLink'>
          Contribute
        </Nav.Link>
        <Nav.Link href='/#team' className='navLink'>
          Team
        </Nav.Link>
        {navOption}
      </Nav>
    </div>
  );
};

export default Dashboard;
