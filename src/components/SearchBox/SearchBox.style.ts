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
  },
});

const SearchItem = styled('li', {
  display: 'flex',
  fd: 'column',
  '&:hover': {
    backgroundColor: '$gray-100',
  },
  '&:not(:last-child)': {
    borderBottom: '1px solid $gray-200',
  },
});

export { SearchBoxWrapper, SearchItem };
