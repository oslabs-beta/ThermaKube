import React, { useState, useEffect } from 'react';
import Lottie from 'react-lottie';
import * as animationData from '../assets/cloud-loader.json';
import * as animationDataDone from '../assets/doneLoading.json';

const Loader = ({ doneFetching, setStillLoading, path }) => {
  //state for render animation logic based on if fetching in parent is done
  const [loadingNotFinished, setLoadingNotFinished] = useState(true);
  // settings for two Lottie animations
  let pathName = path.substring(1, path.length);
  // console.log(pathName, 'pathname from loader');
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
  useEffect(() => {
    let doneFetchingTimer;
    let stillLoadingTimer;
    //when done fetching, set 3.3 second timeout to then throw green checkmark and setStillloading in parent to false
    if (doneFetching) {
      doneFetchingTimer = setTimeout(() => {
        //set state
        setLoadingNotFinished(false);
        // console.log('doneFetchingTimer from loader');
        stillLoadingTimer = setTimeout(() => {
          setStillLoading(false);
          // console.log('stillLoadingTimer from loader');
        }, 700);
      }, 3300);
    }
    return () => clearTimeout(doneFetchingTimer, stillLoadingTimer);
  }, [doneFetching]);
  return (
    <div style={container}>
      <h1>Loading {pathName} data...</h1>
      {loadingNotFinished ? (
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
