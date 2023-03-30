import { styled } from '@/config/stitches';

const CitationItemListContainer = styled('div', {
  borderTop: '1px solid #eee',
  mt: '$9',
  height: 'calc(100vh - 328px)',
  overflow: 'auto',
  display: 'flex',
  fd: 'column',
});

const CitationItemContainer = styled('div', {
  p: '$5',
  display: 'flex',
  fd: 'column',
  jc: 'center',
  borderBottom: '1px solid #eee',
});

export { CitationItemContainer, CitationItemListContainer };
