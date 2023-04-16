import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useQuery } from 'react-query';

import { Avatar, Card, Link, Loading, Tooltip } from '@nextui-org/react';

import { Box, Text } from '@/components/kit';
import LayoutContainer from '@/config/stitches/foundations/layout';

type PaperPageProps = {
  id: string;
};

const fetchPaperById = async (id: string) => {
  return fetch(
    `https://api.semanticscholar.org/graph/v1/paper/${id}?fields=title,abstract,year,venue,openAccessPdf,authors,citations,references.authors,references.paperId,references.title,references.url`,
    {
      headers: {
        'x-api-key': 'zhNIU4U4Ne4AUz7ZNNpTR6boDRDK8liM4TVw2EFU',
      },
    },
  ).then((res) => res.json());
};

const PaperPage: NextPage<PaperPageProps> = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery(['paper', id], () =>
    fetchPaperById(id),
  );

  console.log(data);
  return (
    <Box>
      {isLoading ? (
        <Box height='100vh' display='flex' ai='center' jc='center'>
          <Loading />
        </Box>
      ) : (
        <Box>
          <LayoutContainer>
            <Card css={{ padding: '$11 $9' }}>
              <Text
                css={{ flex: 1, display: 'flex', ai: 'center', mb: '$5' }}
                size='$10'
                as='h1'
              >
                <Box as='span' flex={1}>
                  {data?.title}
                </Box>
                <Tooltip css={{ width: '140px' }} content='Read the paper'>
                  <Link
                    css={{ fontSize: '32px' }}
                    target='_blank'
                    href={data?.openAccessPdf.url}
                  >
                    📖
                  </Link>
                </Tooltip>
              </Text>

              <Text
                css={{
                  display: '-webkit-box',
                  ' -webkit-box-orient': 'vertical',
                  '-webkit-line-clamp': 3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
                size='$4'
                color='$secondary'
                as='p'
              >
                {data?.abstract}
              </Text>
              <Box mt='$5' display='flex' css={{ gap: '$4' }}>
                {data?.authors.map((author: any) => (
                  <Tooltip key={author.authorId} content={author.name}>
                    <Avatar
                      size='md'
                      squared
                      key={author.authorId}
                      text={author.name}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Card>
          </LayoutContainer>
        </Box>
      )}
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps<
  PaperPageProps,
  ParsedUrlQuery
> = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id: id as string,
    },
  };
};

export default PaperPage;
