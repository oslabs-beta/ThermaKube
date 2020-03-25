//renders radial tree visualization of cluster using d3 in Visualizer.js
import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkRadial } from 'd3';
import useResizeObserver from './useResizeObserver';

//rendering logic from:
//https://github.com/muratkemaldar/using-react-hooks-with-d3/blob/10-hierarchy/src/TreeChart.js
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const RadialTree = ({ data, data2 }) => {
  console.log('data at RadialTree', data)
  //console.log('data2[0] at RadialTree', data2[0])
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  
  // we save data to see if it changed
  const previouslyRenderedData = usePrevious(data);

  // will be called initially and on every data change
  useEffect(() => {
    if (data.length !== 0) { // IF VALID DATA WAS PASSED
    const svg = select(svgRef.current);

    // use dimensions from useResizeObserver,
    // but use getBoundingClientRect on initial render
    // (dimensions are null for the first render)
    const { height } =
      dimensions || wrapperRef.current.getBoundingClientRect();
    
    //HARDCODED WIDTH AND HEIGHT FOR NOW
    //const width = 500, height = 500;

    // transform hierarchical data
    //changing width dynamically distorts the graph
    
    const root = hierarchy(data[0]);
    console.log('root', root);
    const treeLayout = tree()
     .size([2 * Math.PI, height/2]);

    // radial tree link
    const radialLink = linkRadial()
      .angle(function(d) { return d.x;})
      .radius(function(d) {return d.y;});

    // enrich hierarchical data with coordinates
    treeLayout(root);

    // console.log('descendants', root.descendants());
    // console.log('links', root.links());

    // links
    //color should change depending on traffic
    const enteringAndUpdatingLinks = svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', radialLink)
      .attr('stroke-dasharray', function() {
        const length = this.getTotalLength();
        return `${length} ${length}`;
      })
      .attr('stroke', '#bfbfbf')
      .attr('fill', '#bfbfbf')
      .attr('opacity', 1);

    if (data !== previouslyRenderedData) { //do not re-render animation if data is not updated
      enteringAndUpdatingLinks
        .attr('stroke-dashoffset', function() {
          return this.getTotalLength();
        })
        .transition()
        .duration(500)
        .delay(link => link.source.depth * 500)
        .attr('stroke-dashoffset', 0);
    }

    // nodes
    const node = svg
      .selectAll('.node')
      .data(root.descendants())
      .enter().append("g")
      .attr('class', 'node')
      .attr( //angle to radian; divide d.y by arbitrary number for now to match the position
        'transform',
        d => `
        rotate(${(d.x * 180) / Math.PI - 90}) 
        translate(${d.y},0)
      `);

    node //append circles to nodes
      .append('circle')
      .attr('opacity', 0)
      .attr('r', 10)
      .attr('fill', function(node) { //color based on depth
        if (node.depth == 0) return '#f8b58c'; //services - salmon
        if (node.depth == 1) return '#0788ff'; //nodes - blue
        if (node.depth == 2) return '#ccccff'; //pods - grey
      })
      //node animation
      .transition()
      .duration(500)
      .delay(node => node.depth * 300)
      .attr('opacity', 1);

	node //append texts to nodes  
     .append("text")
     .text(function(d) { return d.data.name; })
     .attr('opacity', 0)
	 .attr('y', -15)
     .attr('x', -5)
     .attr( //make texts appear horizontal
        'transform',
        d => {
          return `rotate(${(( Math.PI/2 - d.x ) * ( 180/Math.PI ))})`;
        })
     .attr('text-anchor','middle')
      //node animation
      .transition()
      .duration(500)
      .delay(node => node.depth * 300)
      .attr('opacity', 1);
    }
  }, [data, dimensions, previouslyRenderedData]);

  return (
    <div ref={wrapperRef} className='svgWrapper'>
      <svg ref={svgRef} className='radialTreeSvg'></svg>
    </div>
  )

}

export default RadialTree;