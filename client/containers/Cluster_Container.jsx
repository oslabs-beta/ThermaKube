import React from 'react';
import Pods from '../components/cluster/Pods.jsx';
import Nodes from '../components/cluster/Nodes.jsx';
import Services from '../components/cluster/Services.jsx';
import DashBoard from '../components/Dashboard.jsx';

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
