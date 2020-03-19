//traffic view of kubernetes clusters/individual pods
import React, { useRef, useEffect } from 'react';
import { select } from 'd3';

const data = [10, 20, 30, 15, 25];

const Visualizer = () => {
  const svgRef = useRef();

  useEffect(() => {
    console.log(svgRef);
    const svg = select(svgRef.current);
    svg.selectAll('circle').data(data);
  }, [])

  return (
    <div className='visContainer'>
      <h1>Pod Visualizer</h1>
      <svg ref={svgRef}></svg>
    </div>
  )
};

export default Visualizer;
