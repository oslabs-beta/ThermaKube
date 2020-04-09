import React from 'react';
import { Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { BrowserRouter as Link, NavLink } from 'react-router-dom';

import white from '../assets/whiteLogo.png';

const Dashboard = () => {
  const scrollHere = (here) => {
    document.getElementById({ here }).scrollIntoView();
  };
  // const path = window.location.pathname;
  // if (path !== '/login' && path !== '/eks') {
  //   return (
  //     <div className='topNavbar'>
  //       <Nav
  //         defaultActiveKey=''
  //         className='justify-content-between'
  //         id='navbarHome'
  //       >
  //         <Nav.Item>
  //           <Nav.Link href='/' className='dashLogo'>
  //             <img src={white} alt='Logo' className='logoHome' />
  //           </Nav.Link>
  //         </Nav.Item>
  //         <Nav.Link href='/#features'>Features</Nav.Link>
  //         <Nav.Link href='/#contribute'>Contribute</Nav.Link>
  //         <Nav.Link href='/#team'>Team</Nav.Link>
  //         <Nav.Link href='/login' className='ml-auto'>
  //           Login
  //         </Nav.Link>
  //         <NavDropdown title='My Cluster'>
  //           <Nav.Link href='/cluster'>Cluster</Nav.Link>
  //           <Nav.Link href='/visualizer'>Visualizer</Nav.Link>
  //           <Nav.Link href='/alerts'>Alerts</Nav.Link>
  //         </NavDropdown>
  //       </Nav>
  //     </div>
  //   );
  // } else {
  //   return (
  //     <div className='topNavbar'>
  //       <Nav
  //         defaultActiveKey=''
  //         className='justify-content-start'
  //         id='navbarHome'
  //       >
  //         <Nav.Item>
  //           <Nav.Link href='/' className='dashLogo'>
  //             <img src={white} alt='Logo' className='logoHome' />
  //           </Nav.Link>
  //         </Nav.Item>
  //         <Nav.Link href='/#features'>Features</Nav.Link>
  //         <Nav.Link href='/#contribute'>Contribute</Nav.Link>
  //         <Nav.Link href='/#team'>Team</Nav.Link>
  //         {/* <Nav.Link href='/login' className='ml-auto'>
  //           Login
  //         </Nav.Link>
  //         <NavDropdown title='My Cluster'>
  //           <Nav.Link href='/cluster'>Cluster</Nav.Link>
  //           <Nav.Link href='/visualizer'>Visualizer</Nav.Link>
  //           <Nav.Link href='/alerts'>Alerts</Nav.Link>
  //         </NavDropdown> */}
  //       </Nav>
  //     </div>
  //   );
  // }

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
        <Nav.Link href='/#features'>Features</Nav.Link>
        <Nav.Link href='/#contribute'>Contribute</Nav.Link>
        <Nav.Link href='/#team'>Team</Nav.Link>
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
