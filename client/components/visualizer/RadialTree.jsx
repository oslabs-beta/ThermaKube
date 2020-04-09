//renders radial tree visualization of cluster using d3 in Visualizer.js
import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkRadial, event } from 'd3';
import useResizeObserver from './useResizeObserver.jsx';

//function to compare data array length for rendering tree animation
function compareData(length) {
  const ref = useRef();

  useEffect(() => {
    ref.current = length;
  });
  //render animation first time
  if (ref.current === undefined) return true;
  //compare data
  if (ref.current === length) return false;
  return true;
}

//div to show values on node hover/mouseover
const div = select('body')
  .append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

const RadialTree = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);

  // we save data to see if it changed
  const reanimate = compareData(data[0].length);

  // will be called initially and on every data change
  useEffect(() => {
    // console.log('data in radTree', data);
    if (data[0] !== undefined) {
      // IF VALID DATA WAS PASSED
      const svg = select(svgRef.current);

      // use dimensions from useResizeObserver,
      // but use getBoundingClientRect on initial render
      // (dimensions are null for the first render)
      const { height } =
        dimensions || wrapperRef.current.getBoundingClientRect();

      // transform hierarchical data
      //changing width dynamically distorts the graph
      const root = hierarchy(data[0]);
      const treeLayout = tree().size([2 * Math.PI, height / 1.5]);

      // radial tree link
      const radialLink = linkRadial()
        .angle(function(d) {
          return d.x;
        })
        .radius(function(d) {
          return d.y;
        });

      // enrich hierarchical data with coordinates
      treeLayout(root);

      // console.log('root', root)
      // console.log('rt descendants', root.descendants());
      // console.log('rt links', root.links());

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
        .attr('stroke', '#bfbfbf')
        .attr('opacity', 1);

      // nodes
      const node = svg
        .selectAll('.node')
        .data(root.descendants())
        .join('circle') //append circles to nodes
        .attr('class', 'node')
        .attr('opacity', 0)
        .attr(
          //angle to radian
          'transform',
          d => `
          rotate(${(d.x * 180) / Math.PI - 90}) 
          translate(${d.y},0)
        `
        )
        .attr('r', 10)
        .attr('fill', function(node) {
          //color based on depth
          if (node.depth == 0) return '#f8b58c'; //services - salmon
          if (node.depth == 1) return '#0788ff'; //nodes - blue
          if (node.depth == 2) return '#ccccff'; //pods - grey
        })
        .attr('stroke', function(d) { //color change based on traffic
          let color = '#bfbfbf'; //base color = gray
          if (d.depth === 2) { //for pods
            if (d.data.usage !== undefined) {
              //change usage data from string to number
              let cpuUse = parseInt(d.data.usage.cpu.slice(0, -1));
              let memUse = parseInt(d.data.usage.memory.slice(0, -2));

              //update prev usage info if nonexistant
              // if (!prevCpu[d.data.name]) { prevCpu[d.data.name] = cpuUse; console.log('added to obj')}
              // else {
              //   console.log('name, cpu and prev', d.data.name, cpuUse, prevCpu[d.data.name])
              //   //usage increased => return red color
              //   if (prevCpu[d.data.name] < cpuUse) color = '#ee2c2c';
              //   //usage decreased => return green color
              //   else if (prevCpu[d.data.name] > cpuUse) color = '#03e0a0';
              //   //update
              //   prevCpu[d.data.name] = cpuUse;
              // }

              //if CPU usage increased, return red color
              if (cpuUse > 0) color = '#ee2c2c';
            }
          }
          return color;
        });

      //add mouseover event to nodes
      node
        .on('mouseover', function(d) {
          select(this)
            .transition()
            .duration('50')
            .attr('opacity', '.65');

          //div appear on hover
          div
            .transition()
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
          } else if (d.depth === 1) {
            toolInfo = '<b>name: </b>' + d.data.name;
          } else if (d.depth === 2) {
            toolInfo =
              '<b>name: </b>' + d.data.name + '<br/>' +
              '<b>namespace: </b>' + d.data.namespace + '<br/>' +
              '<b>status: </b>' + d.data.status + '<br/>' +
              '<b>CPU usage: </b>' + d.data.usage.cpu + '<br/>' +
              '<b>memory usage: </b>' + d.data.usage.memory + '<br/>' +
              '<b>podIP: </b>' + d.data.podIP + '<br/>' +
              '<b>created: </b>' + d.data.createdAt;
          }

          div
            .html(toolInfo) //append info to div
            .style('left', event.pageX + 15 + 'px') //mouse position
            .style('top', event.pageY - 20 + 'px');
        })
        .on('mouseout', function(d) {
          select(this)
            .transition()
            .duration('50')
            .attr('opacity', '1');

          //div disappears with mouseout
          div
            .transition()
            .duration(50)
            .style('opacity', 0);
        });

      //labels
      const label = svg
        .selectAll('.label')
        .data(root.descendants())
        .join('text')
        .attr('class', 'label')
        .attr('opacity', 0)
        .attr('y', -15)
        .attr('x', -5)
        .attr(
          //angle to radian, find position THEN rotate texts to be horizontal
          'transform',
          d =>
            `rotate(${(d.x * 180) / Math.PI - 90}) 
          translate(${d.y},0)` +
            `rotate(${(Math.PI / 2 - d.x) * (180 / Math.PI)})`
        )
        .attr('text-anchor', 'middle')
        .attr('font-size', 12)
        .text(function(node) {
          if (node.depth === 0) return 'service: ' + node.data.name;
          if (node.depth === 1) return 'node';
          if (node.depth === 2) return 'pod';
        });

      // console.log('reanimate', reanimate);
      // animation
      if (reanimate) {
        //do not re-render animation if data is not updated
        // link animation
        enteringAndUpdatingLinks
          .attr('stroke-dashoffset', function() {
            return this.getTotalLength();
          })
          .transition()
          .duration(500)
          .delay(link => link.source.depth * 500)
          .attr('stroke-dashoffset', 0);

        //node animation
        node
          .transition()
          .duration(500)
          .delay(node => node.depth * 300)
          .attr('opacity', 1);

        //label animation
        label
          .transition()
          .duration(500)
          .delay(node => node.depth * 300)
          .attr('opacity', 1);
      } else {
        //else just change visibility to 1
        enteringAndUpdatingLinks.attr('opacity', 1);
        node.attr('opacity', 1);
        label.attr('opacity', 1);
      }
    }
  }, [data, dimensions, reanimate]);

  return (
    <div ref={wrapperRef} className='svgWrapper'>
      <svg ref={svgRef} className='radialTreeSvg'></svg>
    </div>
  );
};

export default RadialTree;
