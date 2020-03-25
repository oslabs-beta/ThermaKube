import React from 'react';
import Pods from '../components/Pods';
import Nodes from '../components/Nodes';
import Services from '../components/Services';

const Main_Container = () => {
  return (
    <div className='mainContainer'>
      {/* <div className='router'></div> */}
      {/* <TestPod /> */}
      <Pods />
      <Nodes />
      <Services />
    </div>
  );
};

export default Main_Container;
