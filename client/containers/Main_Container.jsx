import React from 'react';
import Visualizer from '../components/Visualizer';
import Alerts from '../components/Alerts';
import TestPod from '../components/TestPod';
import Pods from '../components/Pods';
import Nodes from '../components/Nodes';
import Services from '../components/Services';

const Main_Container = () => {
  return (
    <div className='mainContainer'>
      <div className='router'></div>
      {/* <TestPod /> */}
      <Pods />
      <Nodes />
      <Services />
    </div>
  );
};

export default Main_Container;
