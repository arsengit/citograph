import { styled } from '@/config/stitches';

const SearchBoxWrapper = styled('div', {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fd: 'column',
  '& .papers-card': {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    right: 0,
  },
});

const SearchItem = styled('li', {
  display: 'flex',
  fd: 'column',
  height: '48px',
  '&:hover': {
    backgroundColor: '$gray-100',
  },
  '&:not(:last-child)': {
    borderBottom: '1px solid $gray-200',
  },
});

export { SearchBoxWrapper, SearchItem };
