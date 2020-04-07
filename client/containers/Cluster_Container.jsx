import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pods from '../components/cluster/Pods.jsx';
import Nodes from '../components/cluster/Nodes.jsx';
import Services from '../components/cluster/Services.jsx';

const Cluster_Container = ({ data }) => {
  return (
    <div className='mainContainer'>
      <div>
        <Pods data={data} />
        <Nodes data={data} />
        <Services data={data} />
      </div>
    </div>
  );
};

export default Cluster_Container;
