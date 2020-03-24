// create tree chart from given data using d3
import React, { useRef, useEffect } from 'react';
import { select, hierarchy, tree, linkHorizontal} from 'd3';
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

const TreeChart = ({ data }) => {
  const svgRef = useRef();
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  
  // we save data to see if it changed
  const previouslyRenderedData = usePrevious(data);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);

    // use dimensions from useResizeObserver,
    // but use getBoundingClientRect on initial render
    // (dimensions are null for the first render)
    const { width, height } =
      dimensions || wrapperRef.current.getBoundingClientRect();

    // transform hierarchical data
    const root = hierarchy(data);
    const treeLayout = tree().size([height, width]);

    const linkGenerator = linkHorizontal()
      .x(link => link.y)
      .y(link => link.x);

    // enrich hierarchical data with coordinates
    treeLayout(root);

    console.log('descendants', root.descendants());
    console.log('links', root.links());

    // links
    const enteringAndUpdatingLinks = svg
      .selectAll('.link')
      .data(root.links())
      .join('path')
      .attr('class', 'link')
      .attr('d', linkGenerator)
      .attr('stroke-dasharray', function() {
        const length = this.getTotalLength();
        return `${length} ${length}`;
      })
      .attr('stroke', 'black')
      .attr('fill', 'none')
      .attr('opacity', 1);

    if (data !== previouslyRenderedData) {
      enteringAndUpdatingLinks
        .attr('stroke-dashoffset', function() {
          return this.getTotalLength();
        })
        .transition()
        .duration(500)
        .delay(link => link.source.depth * 500)
        .attr('stroke-dashoffset', 0);
    }

    // labels
    svg
      .selectAll('.label')
      .data(root.descendants())
      .join(enter => enter.append('text').attr('opacity', 0))
      .attr('class', 'label')
      .attr('x', node => node.y)
      .attr('y', node => node.x - 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', 12)
      .text(node => node.data.name)
      .transition()
      .duration(500)
      .delay(node => node.depth * 300)
      .attr('opacity', 1);

    // nodes
    svg
      .selectAll('.node')
      .data(root.descendants())
      .join(enter => enter.append('circle').attr('opacity', 0))
      .attr('class', 'node')
      .attr('cx', node => node.y)
      .attr('cy', node => node.x)
      .attr('r', 10)
      .attr('stroke', 'black')
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

  }, [data, dimensions, previouslyRenderedData]);


return (
    <div ref={wrapperRef} className='svgWrapper'>
      <svg ref={svgRef} className='treeSvg'></svg>
    </div>
  )

}

export default TreeChart;