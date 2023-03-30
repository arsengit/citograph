import Link from 'next/link';

import { styled } from '@/config/stitches';

const StyledContainer = styled('div', {
  width: '100%',
  bc: '#1d2253',
  p: '$5 0',
});

const StyledLink = styled(Link, {
  color: '$textPrimary30',
  fill: '$textPrimary30',
  fontSize: '$3',
  display: 'flex',
  p: '$5 $6',
  ai: 'center',
  jc: 'center',
  textDecoration: 'none',
  br: '$3',
  fontWeight: '$3',
  mr: '$7',
  variants: {
    active: {
      true: {
        bc: ' rgba(208, 227, 250, 0.3)',
        color: 'white',
      },
    },
  },
});

export { StyledContainer, StyledLink };
