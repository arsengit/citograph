import React from 'react';

import { Box, Text } from '@/components/kit';
import Container from '@/config/stitches/foundations/layout';
import SearchBox from '@/components/SearchBox/SearchBox';

// Home page component for the root route
export default function Home(): React.FunctionComponentElement<React.ReactNode> {
  return (
    <Container
      style={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text as='h1' css={{ textAlign: 'center', fontSize: 44, mb: '$20' }}>
        Welcome to Citograph 👋
      </Text>
      <Box
        css={{
          padding: '$6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <SearchBox />
      </Box>
    </Container>
  );
}
