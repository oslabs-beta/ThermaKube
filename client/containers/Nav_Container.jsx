import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import icon from '../assets/icon.png';
import white from '../assets/whiteLogo.png';

const Nav_Container = () => {

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
      <Nav.Link href='/'>
        Features
      </Nav.Link>
      <Nav.Link href='/'>
        Contribute
      </Nav.Link>
      <Nav.Link href='/'>
        Team
      </Nav.Link>
      <Nav.Link href='/login' className='ml-auto'>
        Login
      </Nav.Link>
      <Nav.Link href='/cluster' className='dashStarted'>
        My Cluster
      </Nav.Link>
      </Nav>
    </div>
  )
}

export default Nav_Container;