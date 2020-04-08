//traffic view of kubernetes clusters/individual pods
import React, { useEffect, useState } from 'react';
import RadialTree from '../components/visualizer/RadialTree.jsx';

const Visualizer = props => {
  // console.log(props, 'props from vis');
  let data = [props.data[1]];

  return (
    <div className='visContainer'>
      <h4>Traffic Visualizer</h4>
      <RadialTree data={data} />
    </div>
  );
};

export default Visualizer;
