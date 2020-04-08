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
    const select = await axios.post('/aws/select', {
      credentials,
      cluster,
    });
    const myCluster = select.data.cluster;
    if (myCluster) {
      setMyCluster(myCluster);
      setAuth(true);
    } else {
      console.log('none');
    }
  };

  const namesList = data.map((cluster) => {
    return (
      <button value={cluster} onClick={(e) => selectCluster(e.target.value)}>
        {cluster}
      </button>
    );
  });
  return (
    <>
      {auth ? (
        <Redirect
          to={{
            pathname: '/',
            state: { data: myCluster, credentials: credentials },
          }}
        />
      ) : null}
      <div>
        <h6>Choose Cluster</h6>
        {namesList}
      </div>
    </>
  );
};

export default Eks;
