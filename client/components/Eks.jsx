import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const Eks = (props) => {
  const [auth, setAuth] = useState(false);
  const [myCluster, setMyCluster] = useState({});
  const data = props.history.location.state.data;
  const credentials = props.history.location.state.credentials;

  // function for selecting cluster
  const selectCluster = async (cluster) => {
    const selected = await axios.post('/aws/select', {
      credentials,
      cluster,
    });
    const myCluster = selected.data.cluster;
    if (myCluster) {
      setMyCluster(myCluster);
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
  return (
    <>
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
