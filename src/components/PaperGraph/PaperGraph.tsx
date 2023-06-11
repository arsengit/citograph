import React from 'react';
import {
  GraphCanvas,
  GraphCanvasRef,
  recommendLayout,
  useSelection,
} from 'reagraph';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bubble } from 'react-chartjs-2';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

import { Box, Text, ToggleButton } from '../kit';

import {
  CitationsLegendItem,
  GraphContainer,
  ReferencesLegendItem,
} from './PaperGraph.style';

const Graph = ({
  data,
  activeNode,
  onActiveNodeChange,
  onMount,
  bubbleData,
}: any) => {
  const graphRef = React.useRef<GraphCanvasRef | null>(null);
  const bubbleRef = React.useRef<Bubble | null>(null);
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
  const [vizType, setVizType] = React.useState('graph');

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

  const onBubbleClick = (event: any, array: any) => {
    if (!array.length) return;
    const id = array[0].element?.['$context']?.raw?.id;
    if (id) {
      onActiveNodeChange([id]);
    }
  };

  return (
    <Box>
      <Box mb='$5' p='0 $5' display='flex' ai='center'>
        <Text css={{ mr: '$9' }}>Vizualization type:</Text>
        <ToggleButton
          value={vizType}
          leftValue='graph'
          rightValue='bubble'
          leftLabel='Graph'
          rightLabel='Bubble'
          onChange={(value) => setVizType(value)}
        />
      </Box>
      <GraphContainer>
        {vizType === 'graph' ? (
          <>
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
          </>
        ) : (
          <Bubble
            on
            ref={bubbleRef}
            data={bubbleData}
            options={{
              responsive: true,
              onClick: onBubbleClick,
              plugins: {
                tooltip: {
                  callbacks: {
                    title: function (tooltipItem, data, ...args) {
                      const dataIndex = tooltipItem[0].dataIndex;
                      return tooltipItem[0].dataset.data?.[dataIndex].label;
                    },
                    label: function (tooltipItem, data) {
                      return tooltipItem.dataset.label;
                    },
                    footer: function (tooltipItem, data) {
                      const dataIndex = tooltipItem[0].dataIndex;
                      return `Citation count: ${tooltipItem[0].dataset.data?.[dataIndex].citations}`;
                    },
                  },
                },
              },

              scales: {
                x: {
                  type: 'linear',
                  position: 'bottom',
                  title: { text: 'Year', display: true },
                  ticks: {
                    autoSkip: false,
                    maxTicksLimit: Infinity,
                    display: true,
                    callback: function (value, index, values) {
                      return value.toString();
                    },
                    format: false,
                  },
                },
                y: {
                  type: 'linear',
                  position: 'left',
                  title: {
                    text: 'Influential Citation Count',
                    display: true,
                  },
                  ticks: {
                    autoSkip: false,
                    maxTicksLimit: Infinity,
                    callback: function (value, index, values) {
                      return value.toString();
                    },
                    display: true,
                    format: false,
                  },
                },
              },
            }}
          />
        )}
      </GraphContainer>
    </Box>
  );
};

export default Graph;
