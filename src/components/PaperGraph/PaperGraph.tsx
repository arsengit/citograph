import React from 'react';
import * as d3 from 'd3';

import { GraphContainer, Popover } from './PaperGraph.style';

const Graph = ({ data }: any) => {
  const [hoveredNode, setHoveredNode] = React.useState(null);

  console.log('hovered', hoveredNode);
  const svgRef = React.useRef(null);

  React.useEffect(() => {
    const svg = d3.select(svgRef.current);

    // Set up the simulation
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3
          .forceLink(data.links)
          .id((d) => d.id)
          .distance(30)
          .strength(1),
      )
      .force('charge', d3.forceManyBody().strength(-7))
      .force('center', d3.forceCenter(0, 0))
      .alphaDecay(0.05)
      .restart();

    // Add links
    // const link = svg
    //   .selectAll('.link')
    //   .data(data.links)
    //   .enter()
    //   .append('line')
    //   .attr('class', 'link');

    const link = svg
      .selectAll('.link')
      .data([
        ...data.links,
        ...data.nodes
          .slice(1)
          .map((node) => ({ source: data.nodes[0], target: node })),
      ])
      .enter()
      .append('line')
      .attr('class', 'link');

    // Add nodes
    const node = svg
      .selectAll('.node')
      .data(data.nodes)
      .enter()
      .append('g')
      .attr('class', 'node');

    // node
    //   .append('circle')
    //   .attr('r', (d) => (d.type === 'main' ? 6 : 4))
    //   .attr('fill', (d) =>
    //     d.type === 'main'
    //       ? '#f44336'
    //       : d.type === 'citation'
    //       ? '#4caf50'
    //       : '#2196f3',
    //   );

    node
      .append('circle')
      .attr('r', (d) => (d.type === 'main' ? 6 : 4))
      .attr('fill', (d) =>
        d.type === 'main'
          ? '#f44336'
          : d.type === 'citation'
          ? '#4caf50'
          : '#2196f3',
      )
      .on('mouseenter', (event, d) => {
        console.log({ event });
        setHoveredNode({ ...d, x: event.screenX, y: event.screenY });
      })
      .on('mouseleave', () => {
        // setHoveredNode(null);
      });

    // Update the position of the nodes and links on each tick of the simulation
    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    simulation.alpha(1).restart();

    return () => {
      // Clean up the simulation on unmount
      simulation.stop();
    };
  }, [data]);
  return (
    <GraphContainer>
      {hoveredNode && (
        <Popover
          style={{
            left: `${hoveredNode.x}px`,
            top: `${hoveredNode.y}px`,
            transform: 'translate(-60%, -50%)',
          }}
        >
          <div>
            <strong>Title:</strong> {hoveredNode.title}
          </div>
          <div>
            <strong>Year:</strong> {hoveredNode.year}
          </div>
          <div>
            <strong>Type:</strong> {hoveredNode.type}
          </div>
          <div>
            <strong>ID:</strong> {hoveredNode.id}
          </div>
        </Popover>
      )}
      <svg
        ref={svgRef}
        viewBox='-500 -300 1000 600'
        style={{ width: '100%', height: '100%' }}
      />
    </GraphContainer>
  );
};

export default Graph;
