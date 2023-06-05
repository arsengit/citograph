import React from 'react';
import * as d3 from 'd3';

import { ResponsiveNetworkCanvas } from '@nivo/network';

import { Box } from '../kit';

import { GraphContainer, Popover } from './PaperGraph.style';

const Graph = ({ data }: any) => {
  const [hoveredNode, setHoveredNode] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);

  const svgRef = React.useRef(null);

  React.useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (!mounted) {
      setMounted(true);
    }
    // Set up the simulation
    // const simulation = d3
    //   .forceSimulation(data.nodes)
    //   .force(
    //     'link',
    //     d3
    //       .forceLink(data.links)
    //       .id((d) => d.id)
    //       .distance(320)
    //       .strength(1),
    //   )
    //   .force('charge', d3.forceManyBody().strength(-7))
    //   .force('center', d3.forceCenter(0, 0))
    //   .alphaDecay(0.05)
    //   .restart();

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3
          .forceLink(data.links)
          .id((d) => d.id)
          .distance(150) // Increase distance if needed
          .strength(0.3), // Lower the strength to allow more flexibility
      )
      .force('charge', d3.forceManyBody().strength(-50)) // Increase the strength if nodes are still too close
      .force('center', d3.forceCenter(0, 0))
      .force('collision', d3.forceCollide().radius(10)) // Add collision force with a suitable radius
      .alphaDecay(0.05)
      .restart();

    const linkArc = (d) => {
      const dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy);
      return `M ${d.source.x},${d.source.y} A ${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`;
    };

    // Add links
    const link = svg
      .selectAll('.link')
      .data([
        ...data.links,
        ...data.nodes
          .slice(1)
          .map((node) => ({ source: data.nodes[0], target: node })),
      ])
      .enter()
      .append('path')
      .attr('class', 'link')
      .style('stroke', '#999') // set the stroke color
      .style('stroke-opacity', 0.6) // set the stroke opacity
      .style('stroke-width', 0.5) // set the stroke width
      .style('fill', 'none'); // set the fill color to none

    // Add nodes
    const node = svg
      .selectAll('.node')
      .data(data.nodes)
      .enter()
      .append('g')
      .attr('class', 'node');

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
        console.log(event, d);
        setHoveredNode({ ...d, x: event.clientX, y: event.clientY });
      })
      .on('mouseleave', () => {
        // setHoveredNode(null);
      });

    // Update the position of the nodes and links on each tick of the simulation
    simulation.on('tick', () => {
      link.attr('d', linkArc);

      node.attr('transform', (d) => `translate(${d.x},${d.y})`);
    });

    simulation.alpha(1).restart();

    return () => {
      // Clean up the simulation on unmount
      simulation.stop();
    };
  }, [data]);
  console.log(data);
  return (
    <GraphContainer>
      {hoveredNode && (
        <Popover
          style={{
            left: `${hoveredNode.x}px`,
            top: `${hoveredNode.y}px`,
            // transform: 'translate(-60%, -50%)',
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
      {/* <Box width='1000px' height='600px'>
        <ResponsiveNetworkCanvas
          data={data}
          // layers={['nodes', 'links']}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          linkDistance={(e) => e.distance}
          centeringStrength={0.1}
          distanceMin={10}
          // distanceMax={121}
          repulsivity={6}
          nodeColor={(e) => e.color}
          nodeBorderWidth={1}
          nodeBorderColor={{
            from: 'color',
            modifiers: [['darker', 0.8]],
          }}
          iterations={120}
        />
      </Box> */}
    </GraphContainer>
  );
};

export default Graph;
