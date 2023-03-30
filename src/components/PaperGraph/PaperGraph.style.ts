import { styled } from '@/config/stitches';

const GraphContainer = styled('div', {
  ml: '$5',
  // width: '100%',
  bc: '#fff',
  p: '$5',
  height: 'calc(100vh - 260px)',
  border: '1px solid #eee',
  borderRadius: '8px',
  overflow: 'hidden',
  '& .link': {
    stroke: '#999',
    strokeOpacity: 0.3,
  },

  '& .main-node circle': {
    fill: '#f44336',
    stroke: '#fff',
    strokeWidth: '0.5px',
  },

  '& .node circle': {
    stroke: '#fff',
    strokeWidth: '0.5px',
  },

  '& .node text': {
    pointerEvents: 'none',
    fontSize: '10px',
    textAnchor: 'middle',
  },

  '& .node.reference circle': {
    fill: '#2196f3',
  },

  '& .node.citation circle': {
    fill: '#4caf50',
  },
});

const Popover = styled('div', {
  position: 'absolute',
  transition: 'all .18s ease-out',
  backgroundColor: 'white',
  borderRadius: '4px',
  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.1)',
  padding: '8px',
  fontSize: '12px',
  zIndex: 10,
});

const CitationLegendItem = styled('span', {
  size: 14,
  mr: '$4',
  borderRadius: '50%',
  display: 'inline-block',
});

const ReferencesLegendItem = styled(CitationLegendItem, {
  backgroundColor: 'rgb(232, 193, 160)',
});

const CitationsLegendItem = styled(CitationLegendItem, {
  backgroundColor: 'rgb(97, 205, 187)',
});

export { GraphContainer, Popover, ReferencesLegendItem, CitationsLegendItem };
