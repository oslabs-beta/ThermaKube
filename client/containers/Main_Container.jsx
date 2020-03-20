import React from 'react';
import TestPod from '../components/TestPod';
import Pods from '../components/Pods';

const Main_Container = () => {
  return (
    <div className='mainContainer'>
      <h1>Main Chart</h1>
      <div className='router'></div>
      {/* <TestPod /> */}
      <Pods />
    </div>
  );
};

export default Main_Container;
