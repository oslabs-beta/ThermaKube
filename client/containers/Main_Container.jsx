import React from 'react';
import Visualizer from '../components/Visualizer';
import Alerts from '../components/Alerts';
import TestPod from '../components/TestPod';

const Main_Container = () => {
  return (
    <div className='mainContainer'>
      <h1>Main container</h1>
      <div className='router'></div>
      <TestPod />
    </div>
  );
};

export default Main_Container;
