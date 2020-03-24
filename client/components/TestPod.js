import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestPod = () => {
  // using hooks to set state
  const [pod, setPod] = useState([]);
  let podList;
  // useEffect = Hook version of componentDidMount
  useEffect(() => {
    const fetchPods = async () => {
      // axios request to server side
      const result = await axios.get('/getPods');
      setPod(pod.push(result.data));
      console.log('pod', pod);
      podList = pod.map(p => {
        return <p>{p}</p>;
      });
      console.log('list', podList);
    };
    fetchPods();
  }, []);

  // podList doesn't render the data.. i think it's because state is updated after podList renders
  return (
    <div className='podContainer'>
      <h3>pods</h3>
      {podList}
    </div>
  );
};

export default TestPod;
