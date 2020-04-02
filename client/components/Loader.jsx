import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../assets/cloud-loader.json';
import * as animationDataDone from '../assets/doneLoading.json';

const Loader = ({ stillLoading }) => {
  console.log(stillLoading, 'from loader');
  const defaultOptionsLoading = {
    loop: true,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const defaultOptionsDone = {
    loop: true,
    autoplay: true,
    animationData: animationDataDone.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const container = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
  };
  const loadingBox = {
    borderRadius: '2px',
    borderStyle: 'solid',
    width: '400px',
  };
  return (
    <div style={container}>
      <h1>Loading cluster data...</h1>
      {stillLoading ? (
        <div>
          <Lottie options={defaultOptionsLoading} height={400} width={400} />
        </div>
      ) : (
        <div>
          <Lottie options={defaultOptionsDone} height={400} width={400} />
        </div>
      )}
    </div>
  );
};

export default Loader;
