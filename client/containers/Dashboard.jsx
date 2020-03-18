import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';


const Dashboard = props => {

  return (
	<div className="dashboard">
	  <div className="logo">ThermaKube Logo</div>
	  <Nav defaultActiveKey="" className="flex-column" id="navbar">
	 	<Nav.Link href="/">Main</Nav.Link>
		<Nav.Link href="/visualizer">Pods</Nav.Link>
		<Nav.Link href="/alerts">Alerts</Nav.Link>
	  </Nav>
	</div>

  );
};

export default Dashboard;
