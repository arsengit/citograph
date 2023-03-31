import Link from 'next/link';

import { styled } from '@/config/stitches';

import { Box } from '../kit';

const ResultItem = styled(Link, {
  display: 'flex',
  jc: 'center',
  fd: 'column',
  bs: '0px 0px 0px 1px $colors$secondary50',
  br: '$3',
  p: '$5 $8',
  mb: '$5',
  color: '$textPrimary',
  height: '56px',
  '&:last-child': {
    mb: 0,
  },
  '&:hover': {
    bs: '0px 0px 0px 1px $colors$primary100',
    color: '$primary100',
  },
});

const SearchInput = styled('input', {
  bs: 'unset',
  height: '100%',
  appearance: 'none',
  background: 'transparent',
  border: 0,
  color: '$textPrimary',
  flex: 1,
  fontSize: '$5',
  outline: 'none',
  padding: '0 0 0 8px',
});

const SearchInputContainer = styled(Box, {
  display: 'flex',
  ai: 'center',
  position: 'relative',
  height: '56px',
  borderBottom: '1px solid $colors$secondary20',
  '& svg': {
    color: '$primary100',
  },
});
export { ResultItem, SearchInput, SearchInputContainer };
