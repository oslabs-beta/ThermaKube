import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
// import logo from '../logo.png';
// import ThermaKubeLogo from '../ThermakubeLogo.png';
import icon from '../icon.png';

const Dashboard = props => {
  return (
    <div className='dashboard'>
      {/* <img src={logo} alt='Logo' /> */}
      <img src={icon} alt='Logo' className='logo' />
      <Nav defaultActiveKey='' className='flex-column' id='navbar'>
        <Nav.Link href='/' className='dashMain'>
          Pods
        </Nav.Link>
        <Nav.Link href='/visualizer' className='dashPods'>
          View
        </Nav.Link>
        <Nav.Link href='/alerts' className='dashAlerts'>
          Alerts
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Dashboard;
