import React from 'react';

import { Avatar, Tooltip } from '@nextui-org/react';

import { Box, Text } from '@/components/kit';

function CitationItem({ data, onClick }: any) {
  return (
    <Box onClick={onClick}>
      <Text weight='$3' size='$3'>
        {data?.title}
      </Text>
      <Box ai='center' display='flex' mt='$4'>
        <Text>Authors:</Text>
        <Box
          ai='center'
          flex='1'
          display='flex'
          className='ScrollBar__hidden'
          css={{ ml: '$5', gap: '$5', overflow: 'auto', width: '50%' }}
        >
          {data.authors.map((author: any) => (
            <Tooltip key={author.authorId} content={author.name}>
              <Avatar
                size='xs'
                squared
                key={author.authorId}
                text={author.name}
              />
            </Tooltip>
          ))}
        </Box>
        <Text css={{ ml: '$5' }}>Year: {data.year}</Text>
      </Box>
    </Box>
  );
}

export default CitationItem;
