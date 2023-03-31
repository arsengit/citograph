import { Box } from '@/components/kit';

import { styled } from '..';

const Container = styled(Box, {
  maxWidth: '1300px',
  m: '0 auto', // Centers the container horizontally
  p: '0 $11', // Adds some padding to the left and right of the container
});

export default Container;
