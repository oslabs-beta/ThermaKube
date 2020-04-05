import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import icon from '../assets/icon.png';
import white from '../assets/whiteLogo.png';

const Home = () => {
  return (
    <div className='homeContainer'>
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
        <Nav.Link href='/login' className='ml-auto'>
          Login
        </Nav.Link>
        <Nav.Link href='/cluster' className='dashStarted'>
          My Cluster
        </Nav.Link>
      </Nav>
      <div className='heroContainer'>
        <div className='col1'>
          <img src={icon} alt='Logo' className='logoMain' />
          <h1 className='logoName'>ThermaKube</h1>
        </div>
        <div className='col2'></div>
      </div>
    </div>
  );
};

export default Home;
