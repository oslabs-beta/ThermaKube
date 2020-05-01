import React, { useEffect, useState } from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';

import white from '../assets/whiteLogo.png';
import Cookies from 'js-cookie';

const Dashboard = () => {
  let [clusterNav, setClusterNav] = useState([]);

  useEffect(() => {
    const token = Cookies.get('token'); //undefined if not logged in
    // const showCluster;
    if(token) {
      setClusterNav(
        <NavDropdown title='My Cluster' className='navLink'>
          <Nav.Link href='/cluster'>Cluster</Nav.Link>
          <Nav.Link href='/visualizer'>Visualizer</Nav.Link>
          <Nav.Link href='/alerts'>Alerts</Nav.Link>
        </NavDropdown>
      );
    }
  }, [])

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
        <Nav.Link href='/login' className='ml-auto'>
          Login
        </Nav.Link>
        {clusterNav}
      </Nav>
    </div>
  );
};

export default Dashboard;
