import React from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { routes } from '@/routes/routes';
import Container from '@/config/stitches/foundations/layout';

import { Box } from '../kit';
import SearchWithHotkey from '../SearchWithHotkey/SearchWithHotkey';

import { StyledContainer, StyledLink } from './Sidebar.style';

/**
 * Sidebar component that is displayed on every page.
 * @returns {React.FunctionComponentElement<React.ReactNode>} The Sidebar component.
 * @constructor
 * @example
 * <Sidebar />
 */
function Sidebar(): React.FunctionComponentElement<React.ReactNode> {
  const router = useRouter();
  const currentRoute = router.pathname;
  return (
    <StyledContainer>
      <Container display='flex' ai='center'>
        <Box display='flex' ai='center' flex='1'>
          <Box mr='$13'></Box>
          {Object.values(routes).map((route) => (
            <StyledLink
              active={currentRoute === route.path}
              key={route.path}
              href={route.path}
            >
              {route.icon}
              <Box ml='$4'>{route.displayName}</Box>
            </StyledLink>
          ))}
        </Box>
        <Box>{/* <SearchWithHotkey /> */}</Box>
      </Container>
    </StyledContainer>
  );
}

Sidebar.displayName = 'Sidebar';
export default React.memo(Sidebar);
