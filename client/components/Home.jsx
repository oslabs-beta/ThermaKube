import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Hero from './home/Hero.jsx';
import Features from './home/Features.jsx';
import Contribute from './home/Contribute.jsx';
import Team from './home/Team.jsx';

const Home = (props) => {
  const [awsData, setAwsData] = useState({
    pods: [],
    nodes: [],
    services: [],
  });
  useEffect(() => {
    if (props.location.state) {
      const awsInfo = props.location.state.data;
      console.log('awsInfo', awsInfo);
      if (awsInfo) {
        setAwsData({
          ...awsData,
          pods: awsInfo.pods,
          nodes: awsInfo.nodes,
          services: awsInfo.services,
        });
      } else {
        console.log('none');
      }
    }
  }, []);
  return (
    <>
      {console.log('awsData', awsData)}
      {awsData !== 0 ? (
        <Redirect
          to={{
            pathname: '/',
            state: { data: awsData },
          }}
        />
      ) : null}
      <React.Fragment>
        <div className='homeContainer'>
          <Hero />
          <Features />
          <Contribute />
          <Team />
        </div>
      </React.Fragment>
    </>
  );
};

export default Home;
