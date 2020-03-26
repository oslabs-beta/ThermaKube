//renders radial tree visualization of cluster using d3 in Visualizer.js
import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkRadial, event } from 'd3';
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

const RadialTree = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  
  // we save data to see if it changed
  const previouslyRenderedData = usePrevious(data);

  // will be called initially and on every data change
  useEffect(() => {
    if (data.length !== 0) { // IF VALID DATA WAS PASSED
      console.log('data in radialTree', data)
      const svg = select(svgRef.current);

      // use dimensions from useResizeObserver,
      // but use getBoundingClientRect on initial render
      // (dimensions are null for the first render)
      const { height } =
        dimensions || wrapperRef.current.getBoundingClientRect();
    
      // transform hierarchical data
      //changing width dynamically distorts the graph
      const root = hierarchy(data[0]);
      // console.log('root', root);
      const treeLayout = tree()
      .size([2 * Math.PI, height/2]);

      // radial tree link
      const radialLink = linkRadial()
        .angle(function(d) { return d.x;})
        .radius(function(d) {return d.y;});

      // enrich hierarchical data with coordinates
      treeLayout(root);

      console.log('root', root)
      console.log('rt descendants', root.descendants());
      console.log('rt links', root.links());

      // links
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
        .attr('stroke', function(d) { //color change depending on traffic
          return '#bfbfbf'
        }) 
        .attr('opacity', 1);

        // enteringAndUpdatingLinks
        // .attr('stroke-dashoffset', function() {
        //   return this.getTotalLength();
        // })
        // .transition()
        // .duration(500)
        // .delay(link => link.source.depth * 500)
        // .attr('stroke-dashoffset', 0);

      // if (data !== previouslyRenderedData) { //do not re-render animation if data is not updated
      //   enteringAndUpdatingLinks
      //     .attr('stroke-dashoffset', function() {
      //       return this.getTotalLength();
      //     })
      //     .transition()
      //     .duration(500)
      //     .delay(link => link.source.depth * 500)
      //     .attr('stroke-dashoffset', 0);
      // }

      // nodes
      const node = svg
        .selectAll('.node')
        .data(root.descendants())
        .enter().append("g")
        .attr('class', 'node')
        .attr( //angle to radian
          'transform',
          d => `
          rotate(${(d.x * 180) / Math.PI - 90}) 
          translate(${d.y},0)
        `);

      //div to show values on node hover/mouseover
      const div = select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);

      node //append circles to nodes
        .append('circle')
        .attr('opacity', 0)
        .attr('r', 10)
        .attr('fill', function(node) { //color based on depth
          if (node.depth === 0) return '#f8b58c'; //services - salmon
          if (node.depth === 1) return '#0788ff'; //nodes - blue
          if (node.depth === 2) return '#ccccff'; //pods - grey
        })
        //add mouseover event
        .on('mouseover', function(d) {	
          select(this).transition()
            .duration('50')
            .attr('opacity', '.65');

          //div appear on hover
          div.transition()
            .duration(50)
            .style('opacity', 1);

          let toolInfo = ''; //info to appear on hover
          if (d.depth === 0) {
            toolInfo = 
            '<b>name: </b>' + d.data.name + '<br/>' +
            '<b>type: </b>' + d.data.type + '<br/>' +
            '<b>namespace: </b>' + d.data.namespace + '<br/>' +
            '<b>port: </b>' + d.data.port + '<br/>' +
            '<b>clusterIP: </b>' + d.data.clusterIP;
          }
          else if (d.depth === 1) {
            toolInfo = 
            '<b>name: </b>' + d.data.name;
          }
          else if (d.depth === 2) {
            toolInfo = 
            '<b>name: </b>' + d.data.name + '<br/>' +
            '<b>namespace: </b>' + d.data.namespace + '<br/>' +
            '<b>status: </b>' + d.data.status + '<br/>' +
            '<b>podIP: </b>' + d.data.podIP + '<br/>' +
            '<b>created: </b>' + d.data.createdAt
          }

          div.html(toolInfo) //append info to div
            .style("left", (event.pageX + 15) + "px") //mouse position
            .style("top", (event.pageY - 20) + "px");
          })					
        .on('mouseout', function(d) {		
          select(this).transition()
            .duration('50') 
            .attr('opacity', '1');

          //div disappears with mouseout
          div.transition()
            .duration(50)
            .style('opacity', 0);
          })
        //node animation
        .transition()
        .duration(500)
        .delay(node => node.depth * 300)
        .attr('opacity', 1);

      node //append texts to nodes  
        .append("text")
        .text(function(node) { 
          if (node.depth === 0) return 'service: ' + node.data.name;
          if (node.depth === 1) return 'node';
          if (node.depth === 2) return 'pod';
        })
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