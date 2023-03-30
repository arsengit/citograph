import Link from 'next/link';
import { Avatar, Tooltip } from '@nextui-org/react';

import { Box, Text } from '@/components/kit';

import { PublicationCardContainer } from './styles';

function PublicationCard({ paper }: any) {
  return (
    <PublicationCardContainer className='PublicationCard'>
      <Link href={`/paper/${paper.paperId}`}>
        <Text color='$primary' as='h2' size='$5' css={{ mb: '$2' }}>
          {paper.title}
        </Text>
      </Link>
      <Box ai='center' display='flex' mt='$4'>
        <Text>Authors:</Text>
        <Box
          ai='center'
          flex='1'
          display='flex'
          className='ScrollBar__hidden'
          css={{ ml: '$5', gap: '$5', overflow: 'auto', width: '40%' }}
        >
          {paper.authors.map((author: any) => (
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
        <Text css={{ ml: '$5' }}>Year: {paper.year}</Text>
      </Box>
      <Text
        color='$textPrimary80'
        css={{
          '-webkit-line-clamp': 3,
          '-webkit-box-orient': 'vertical',
          display: '-webkit-box',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
        as='p'
      >
        {paper.abstract}
      </Text>
      <Box>
        <Text weight={'$4'} css={{ mr: '$9' }}>
          Influential citation count: {paper.influentialCitationCount}
        </Text>
        <Text weight={'$4'}>Citations: {paper.citationCount}</Text>
      </Box>
    </PublicationCardContainer>
  );
}

export default PublicationCard;
