import React from 'react';
import { useQuery } from 'react-query';

import Link from 'next/link';
import { Card, Input, Loading } from '@nextui-org/react';

import { useDebounce } from '@/hooks/useDebounce';
import {
  SearchBoxWrapper,
  SearchItem,
} from '@/components/SearchBox/SearchBox.style';
import { Box, Text } from '@/components/kit';

import SearchBox from '../../components/SearchBox/SearchBox';

export default function Authors({ authors }: any) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 800);
  const { isLoading, error, data } = useQuery(
    ['search', debouncedSearchTerm],
    () => {
      if (debouncedSearchTerm.length === 0) {
        return;
      } else {
        return fetch(
          `https://api.semanticscholar.org/graph/v1/author/search?query=${debouncedSearchTerm}&fields=name,url,paperCount,papers.title,papers.year,papers.fieldsOfStudy,citationCount&limit=100`,
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
    <div>
      <SearchBoxWrapper>
        <Text
          as='h2'
          size='$8'
          css={{ mb: '$9', textAlign: 'center', letterSpacing: 'unset' }}
        >
          Easily find authors on Semantic Scholar with Citograph 📚
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
            <Box as='ul' css={{ overflow: 'auto', maxHeight: 300 }}>
              {data?.data?.length > 0 ? (
                data?.data?.map((author: any) => (
                  <SearchItem key={author.authorId}>
                    <Link href={`/authors/${author.authorId}`}>
                      <Text
                        title={author.name}
                        size='$4'
                        css={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {author.name}
                      </Text>
                    </Link>
                    <Box ai='center' display='flex'>
                      <Text color='$textPrimary80'>
                        Papers: {author.papers.length}
                      </Text>
                      <Text color='$textPrimary80' css={{ ml: '$5' }}>
                        Citations: {author.citationCount}
                      </Text>
                    </Box>
                  </SearchItem>
                ))
              ) : (
                <Text
                  as='h2'
                  size='$5'
                  css={{ textAlign: 'center', letterSpacing: 'unset' }}
                >
                  No results found
                </Text>
              )}
            </Box>
          </Card>
        )}
      </SearchBoxWrapper>
    </div>
  );
}
