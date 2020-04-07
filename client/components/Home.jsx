import React from 'react';

import Hero from './home/Hero.jsx';
import Features from './home/Features.jsx';
import Contribute from './home/Contribute.jsx';
import Team from './home/Team.jsx';

const Home = () => {
  return (
    <React.Fragment>
      <div className='homeContainer'>
        <Hero />
        <Features />
        <Contribute />
        <Team />
      </div>
    </React.Fragment>
  );
};

export default Home;
