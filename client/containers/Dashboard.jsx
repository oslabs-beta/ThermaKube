import React from 'react';
import { Nav,Navbar } from 'react-bootstrap';

const Dashboard = () => {
  return (
	<Nav defaultActiveKey="" className="flex-column" id="navbar">
	  <Nav.Link href="/">ThermaKube</Nav.Link>
	  <Nav.Link eventKey="/">Pod</Nav.Link>
	  <Nav.Link eventKey="/">Alerts</Nav.Link>
	</Nav>
  );
};

export default Dashboard;
