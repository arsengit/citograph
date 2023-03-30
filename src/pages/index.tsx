import React from 'react';

import Link from 'next/link';

import { Box, Button, Text } from '@/components/kit';
import Container from '@/config/stitches/foundations/layout';

// Home page component for the root route
export default function App(): React.FunctionComponentElement<React.ReactNode> {
  return (
    <Container
      style={{
        height: 'calc(100vh - 100px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        css={{
          padding: '$6',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Text as='h1' css={{ textAlign: 'center', fontSize: 44 }}>
          Welcome to Citograph
        </Text>
        <Text
          size='$8'
          as='p'
          css={{
            textAlign: 'center',
            marginTop: '$8',
            marginBottom: '$12',
            fontWeight: 300,
          }}
        >
          To create a new project navigate to projects page
        </Text>
      </Box>
    </Container>
  );
}
