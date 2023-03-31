import React from 'react';

import Sidebar from '../Sidebar';
import { Box } from '../kit';
import NotificationService from '../NotificationService/NotificationService';

/**
 * The Layout component of the application that is displayed on every page.
 * @param {React.ReactNode} children The children of the Layout component.
 * @returns {React.FunctionComponentElement<React.ReactNode>} The Layout component.
 */
function Layout({
  children,
}: {
  children: React.ReactNode;
}): React.FunctionComponentElement<React.ReactNode> {
  return (
    <Box display='flex' fd='column' height='100%'>
      <Sidebar />
      <Box display='flex' fd='column'>
        <Box as='main' p='$7'>
          <NotificationService />
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default React.memo(Layout);
