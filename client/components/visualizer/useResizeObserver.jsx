//custom react hook for dynamically-sized, responsive diagram
//returns changed width and height of element
import React, { useState, useEffect } from 'react';
//for support in other browsers, i.e. Edge and Safari
import ResizeObserver from 'resize-observer-polyfill';

const useResizeObserver = (ref) => {
  const [dimensions, setDimensions] = useState(null);
  
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
}

export default useResizeObserver;