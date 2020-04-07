import React from 'react';
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';

import icon from '../assets/icon.png';
import white from '../assets/whiteLogo.png';

const Dashboard = () => {
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
        <Nav.Link href='/'>Features</Nav.Link>
        <Nav.Link href='/'>Contribute</Nav.Link>
        <Nav.Link href='/'>Team</Nav.Link>
        <Nav.Link href='/login' className='ml-auto'>
          Login
        </Nav.Link>
        <NavDropdown title='My Cluster'>
          <Nav.Link href='/cluster'>Cluster</Nav.Link>
          <Nav.Link href='/visualizer'>Visualizer</Nav.Link>
          <Nav.Link href='/alerts'>Alerts</Nav.Link>
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default Dashboard;
