import React from 'react';
import Pods from '../components/Pods';
import Nodes from '../components/Nodes';
import Services from '../components/Services';
import DashBoard from './Dashboard';

const Main_Container = () => {
  return (
    <div className='appCont'>
      <DashBoard />
      <div className='mainContainer'>
        {/* <div className='router'></div> */}
        {/* <TestPod /> */}
        <Pods />
        <Nodes />
        <Services />
      </div>
    </div>
  );
};

export default Main_Container;
