import React from 'react';

import { Avatar, Tooltip } from '@nextui-org/react';
import { IconCompass, IconFileSearch, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

import { Box, Text } from '@/components/kit';

import { IconButton } from '../../../kit';

import { CitationItemContainer } from './CitationItem.style';

function CitationItem({ data, onClick }: any) {
  return (
    <CitationItemContainer className='CitationItem'>
      <Box display='flex' ai='center' jc='space-between'>
        <Text
          title={data?.title}
          css={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            width: '100%',
          }}
          weight='$3'
          size='$3'
        >
          {data?.title}
        </Text>
        <Box display='flex' ai='center'>
          <Tooltip content='Find in graph'>
            <IconButton
              css={{ ml: '$5' }}
              variant='text'
              onClick={() => onClick(data.paperId)}
              icon={<IconCompass size={18} />}
            />
          </Tooltip>
          <Tooltip content='Open Paper'>
            <Link href={`/paper/${data.paperId}`}>
              <IconButton
                css={{ ml: '$5' }}
                variant='text'
                icon={<IconSearch size={18} />}
              />
            </Link>
          </Tooltip>
        </Box>
      </Box>
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
            <Link key={author.authorId} href={`/authors/${author.authorId}`}>
              <Tooltip content={author.name}>
                <Avatar
                  style={{
                    cursor: 'pointer',
                  }}
                  size='xs'
                  squared
                  key={author.authorId}
                  text={author.name}
                />
              </Tooltip>
            </Link>
          ))}
        </Box>
        <Text css={{ ml: '$5' }}>Year: {data.year}</Text>
      </Box>
    </CitationItemContainer>
  );
}

export default CitationItem;
