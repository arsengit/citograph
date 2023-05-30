import Link from 'next/link';
import { Avatar, Tooltip } from '@nextui-org/react';

import { Box, Text } from '@/components/kit';

import { PublicationCardContainer } from './styles';

function PublicationCard({ paper }: any) {
  console.log(paper);
  return (
    <PublicationCardContainer>
      <Link href={`/paper/${paper.paperId}`}>
        <Text color='$primary' as='h2' size='$5' css={{ mb: '$2' }}>
          {paper.title}
        </Text>
      </Link>
      <Box ai='center' display='flex' mt='$4'>
        <Text>Authors:</Text>
        <Box
          ai='center'
          display='flex'
          className='ScrollBar__hidden'
          css={{ ml: '$5', gap: '$5', overflow: 'auto', width: '50%' }}
        >
          {paper.authors.map((author: any) => (
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
    </PublicationCardContainer>
  );
}

export default PublicationCard;
