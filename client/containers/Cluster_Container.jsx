import React from 'react';

import Pods from '../components/cluster/Pods.jsx';
import Nodes from '../components/cluster/Nodes.jsx';
import Services from '../components/cluster/Services.jsx';

const Cluster_Container = (props) => {
  const { data } = props;
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
