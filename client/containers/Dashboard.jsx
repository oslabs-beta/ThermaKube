import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Nav, NavItem, LinkContainer } from 'react-bootstrap';

const Dashboard = props => {
//   let history = useHistory();

  return (
	<div className="dashboard">
	  <div className="logo">ThermaKube Logo</div>
	  <Nav defaultActiveKey="" className="flex-column" id="navbar">
	  <Nav.Item as="li">
		<Nav.Link href="/visualizer">Pods</Nav.Link>
	  </Nav.Item>
	  <Nav.Item as="li">
		<Nav.Link href="/alerts">Alerts</Nav.Link>
	  </Nav.Item>
	  </Nav>
	</div>

  );
};

export default Dashboard;
