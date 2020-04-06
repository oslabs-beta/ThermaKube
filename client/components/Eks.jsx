import React from 'react';

const Eks = (props) => {
  const data = props.history.location.state.data;
  console.log(data);

  // function for selecting cluster
  //   const selectCluster = (cluster) => {

  //   }

  const namesList = data[0].map((clusters) => {
    return <div onClick={() => console.log('hi')}>{clusters}</div>;
  });
  return (
    <div>
      <h6>Choose Cluster</h6>
      {namesList}
    </div>
  );
};

export default Eks;
