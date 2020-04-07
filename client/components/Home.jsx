import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import icon from '../assets/icon.png';
import white from '../assets/whiteLogo.png';

import Nav_Container from '../containers/Nav_Container.jsx';
import Hero from './home/Hero.jsx';
import Features from './home/Features.jsx';
import Contribute from './home/Contribute.jsx';
import Team from './home/Team.jsx';

const Home = () => {
  return (
    <React.Fragment>
      <Nav_Container />
      <div className="homeContainer"> 
        <Hero /> 
        <Features />
        <Contribute /> 
        <Team />
      </div>
    </React.Fragment>
  );
};

export default Home;
