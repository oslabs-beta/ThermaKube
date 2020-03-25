import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import icon from '../assets/icon.png';

const Dashboard = props => {
  return (
    <div className='dashboard'>
      <img src={icon} alt='Logo' className='logo' />
      <Nav defaultActiveKey='' className='flex-column' id='navbar'>
        <Nav.Link href='/' className='dashCluster'>
          Cluster
        </Nav.Link>
        <Nav.Link href='/visualizer' className='dashTraffic'>
          Traffic
        </Nav.Link>
        <Nav.Link href='/alerts' className='dashAlerts'>
          Alerts
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Dashboard;
