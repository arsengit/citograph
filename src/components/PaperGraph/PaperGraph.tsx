import React from 'react';
import {
  GraphCanvas,
  GraphCanvasRef,
  recommendLayout,
  useSelection,
} from 'reagraph';

import { Box, Text } from '../kit';

import {
  CitationsLegendItem,
  GraphContainer,
  ReferencesLegendItem,
} from './PaperGraph.style';

const Graph = ({ data, activeNode, onActiveNodeChange, onMount }: any) => {
  const graphRef = React.useRef<GraphCanvasRef | null>(null);
  const {
    actives,
    onNodeClick,
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
  const [selectedNode, setSelectedNode] = React.useState([]);

  const layout = recommendLayout(data.nodes, data.links);

  const onNodeClickHandler = (node: any, props: any) => {
    onActiveNodeChange([node.id]);
    setSelectedNode([node.id]);
    onNodeClick(node, props);
  };

  React.useEffect(() => {
    if (activeNode[0] !== selectedNode[0]) {
      setSelectedNode(activeNode);
    }
  }, [activeNode, selectedNode]);

  React.useEffect(() => {
    onMount();
  }, []);

  return (
    <GraphContainer>
      <Box css={{ gap: '$9' }} display='flex' ai='center'>
        <Box display='flex' ai='center'>
          <CitationsLegendItem />
          <Text>Citations</Text>
        </Box>
        <Box display='flex' ai='center'>
          <ReferencesLegendItem /> <Text>References</Text>
        </Box>
      </Box>
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
          selections={selectedNode}
          animated={false}
          actives={actives}
          draggable
          layout={layout}
          onNodePointerOver={onNodePointerOver}
          onNodePointerOut={onNodePointerOut}
          onCanvasClick={(event) => {
            onCanvasClick(event);
            onActiveNodeChange([]);
            setSelectedNode([]);
          }}
          onNodeClick={onNodeClickHandler}
        />
      </Box>
    </GraphContainer>
  );
};

export default Graph;
