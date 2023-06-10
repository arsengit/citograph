import React from 'react';
import { useQuery } from 'react-query';

import { Avatar, Card, Input, Loading, Tooltip } from '@nextui-org/react';
import Link from 'next/link';

import { useDebounce } from '@/hooks/useDebounce';

import { Box, Text } from '../kit';

import { SearchBoxWrapper, SearchItem } from './SearchBox.style';

function SearchBox() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const { isLoading, error, data } = useQuery(
    ['search', debouncedSearchTerm],
    () => {
      if (debouncedSearchTerm.length === 0) {
        return;
      } else {
        return fetch(
          `https://api.semanticscholar.org/graph/v1/paper/search?query=${debouncedSearchTerm}&fields=url,abstract,authors,title`,
          {
            headers: {
              'x-api-key': 'zhNIU4U4Ne4AUz7ZNNpTR6boDRDK8liM4TVw2EFU',
            },
          },
        ).then((res) => res.json());
      }
    },
  );

  const handleSearch = (e: any) => {
    const { value } = e.target;
    setSearchTerm(value);
  };
  return (
    <SearchBoxWrapper>
      <Text
        as='h2'
        size='$8'
        css={{ mb: '$9', textAlign: 'center', letterSpacing: 'unset' }}
      >
        Easily find papers and authors on Semantic Scholar with Citograph 📚
      </Text>
      <Input
        onChange={handleSearch}
        value={searchTerm}
        width='500px'
        placeholder='Search by author, article or keyword'
        contentRight={isLoading ? <Loading size='xs' /> : null}
      />
      {!isLoading && data?.data && (
        <Card className='papers-card' css={{ mw: 500 }}>
          <Box as='ul' height='300px' css={{ overflow: 'auto' }}>
            {data.data.map((paper: any) => (
              <SearchItem key={paper.paperId}>
                <Link href={`/paper/${paper.paperId}`}>
                  <Text
                    title={paper.title}
                    size='$4'
                    css={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {paper.title}
                  </Text>
                </Link>
                <Box ai='center' display='flex' mt='$4'>
                  <Text>Authors:</Text>
                  <Box
                    ai='center'
                    display='flex'
                    className='ScrollBar__hidden'
                    css={{ ml: '$5', gap: '$5', overflow: 'auto' }}
                  >
                    {paper.authors.map((author: any) => (
                      <Link
                        key={author.authorId}
                        href={`/authors/${author.authorId}`}
                      >
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
                </Box>
              </SearchItem>
            ))}
          </Box>
        </Card>
      )}
    </SearchBoxWrapper>
  );
}

export default SearchBox;
