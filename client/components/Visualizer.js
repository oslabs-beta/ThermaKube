//traffic view of kubernetes clusters/individual pods
import React, { useEffect, useState, useRef } from 'react';
import TreeChart from './TreeChart';
import RadialTree from './RadialTree';

const Visualizer = () => {
  let [data, setData] = useState(initData);

  //initial data
  //HARD-CODED TO TEST
  const initData = {
    name: 'service-name',
    children: [
      {
        name: 'node-1',
        children: [
          { name: 'node1-pod1' },
          { name: 'node1-pod2' },
          { name: 'node1-pod3' },
          { name: 'node1-pod4' },
          { name: 'node1-pod5' },
        ],
      },
      {
        name: 'node-2',
        children: [
          { name: 'node2-pod1' },
          { name: 'node2-pod2' },
          { name: 'node2-pod3' },
          { name: 'node2-pod4' },
          { name: 'node2-pod5' },
          { name: 'node2-pod6' },
          { name: 'node2-pod7' },
        ],
      },
      {
        name: 'node-3',
        children: [
          { name: 'node3-pod1' },
          { name: 'node3-pod2' },
          { name: 'node3-pod3' },
        ],
      },
    ],
  };

  return (
    <div className='visContainer'>
      <h1>Pod Visualizer</h1>
      <TreeChart data={initData} />
      <RadialTree data={initData} />
    </div>
  );
};

export default Visualizer;
