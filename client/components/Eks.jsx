import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Eks = (props) => {
  const [auth, setAuth] = useState(false);
  const [myCluster, setMyCluster] = useState({
    pods: [],
    nodes: [],
    services: [],
    podUsage: [],
  });
  const data = props.location.state.data;
  const credentials = props.location.state.credentials;

  // function for selecting cluster
  const selectCluster = async (cluster) => {
    const selected = await axios.post('/aws/select', {
      credentials,
      cluster,
    });
    const awsCluster = selected.data;
    if (awsCluster) {
      setMyCluster({
        ...myCluster,
        pods: awsCluster.pods,
        nodes: awsCluster.nodes,
        services: awsCluster.services,
        podUsage: awsCluster.podUsage,
      });
      setAuth(true);
    } else {
      console.log('none');
    }
  };

  const namesList = data.map((cluster) => {
    return (
      <button
        className='clusterButton'
        value={cluster}
        onClick={(e) => selectCluster(e.target.value)}
      >
        {cluster}
      </button>
    );
  });
  // once cluster is selected, pass down data from aws api
  return (
    <>
      {console.log('myCluster', myCluster)}
      {auth ? (
        <Redirect
          to={{
            pathname: '/cluster',
            state: { data: myCluster, credentials: credentials },
          }}
        />
      ) : null}
      <div className='selectClusterContainer'>
        <h6 className='chooseTitle'>Choose Cluster</h6>
        {namesList}
      </div>
    </>
  );
};

export default Eks;
