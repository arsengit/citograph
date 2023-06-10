import React from 'react';
import {
  GraphCanvas,
  GraphCanvasRef,
  recommendLayout,
  useSelection,
} from 'reagraph';

import { Box, Text } from '../kit';

import { GraphContainer, Popover } from './PaperGraph.style';

const Graph = ({ data, activeNode }: any) => {
  const [selectedNode, setSelectedNode] = React.useState([]);
  const graphRef = React.useRef<GraphCanvasRef | null>(null);
  const {
    actives,
    onNodeClick,
    selections,
    onCanvasClick,
    onNodePointerOver,
    onNodePointerOut,
  } = useSelection({
    ref: graphRef,
    nodes: data.nodes,
    edges: data.links,
    pathHoverType: 'all',
    pathSelectionType: 'all',
  });

  // console.log(selections);

  // const layout = recommendLayout(data.nodes, data.links);

  // const onNodeClickHandler = (node: any) => {
  //   setSelectedNode([node.id]);
  //   onNodeClick(node);
  // };

  // React.useEffect(() => {
  //   if (activeNode !== selectedNode[0]) {
  //     setSelectedNode([activeNode]);
  //   }
  // }, [activeNode]);

  return (
    <GraphContainer>
      <Box
        css={{
          height: '100%',
          width: '100%',
          '& > div': {
            height: '100%',
            width: '100%',
            position: 'unset',
          },
        }}
      >
        <GraphCanvas
          ref={graphRef}
          nodes={data.nodes}
          edges={data.links}
          edgeInterpolation='curved'
          clusterAttribute='type'
          layoutType='forceDirected2d'
          selections={selections}
          animated={false}
          actives={actives}
          draggable
          // layout={layout}
          onNodePointerOver={onNodePointerOver}
          onNodePointerOut={onNodePointerOut}
          onCanvasClick={onCanvasClick}
          onNodeClick={onNodeClick}
        />
      </Box>
    </GraphContainer>
  );
};

export default Graph;
