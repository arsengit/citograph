import { useQuery } from 'react-query';
import { GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { Card, Grid, Link, Loading } from '@nextui-org/react';

import { Box, Text } from '@/components/kit';
import Separator from '@/components/kit/Separator';
import LayoutContainer from '@/config/stitches/foundations/layout';
import TabItem from '@/components/pages/authors/Tabs/TabItem/TabItem';
import AuthorTabs from '@/components/pages/authors/Tabs';
import Publications from '@/components/pages/authors/Publications';

const fetchMainPaperById = async (id: string) => {
  const paper = await fetch(
    `https://api.semanticscholar.org/graph/v1/author/${id}?fields=name,url,aliases,affiliations,homepage,paperCount,citationCount,hIndex,papers.paperId,papers.title,papers.abstract,papers.venue,papers.year,papers.citationCount,papers.fieldsOfStudy,papers.externalIds,papers.authors`,
    {
      headers: {
        'x-api-key': 'zhNIU4U4Ne4AUz7ZNNpTR6boDRDK8liM4TVw2EFU',
      },
    },
  ).then((res) => res.json());
  return {
    ...paper,
  };
};

export default function Author({ id }: any) {
  const [tab, setTab] = React.useState('publications');
  const { data, isLoading, error } = useQuery(['paper', id], () =>
    fetchMainPaperById(id),
  );

  const tabs = React.useMemo(() => {
    return {
      publications: <Publications papers={data?.papers} />,
      'citing-authors': <div>citing-authors</div>,
      'referenced-authors': <div>referenced-authors</div>,
      'co-authors': <div>co-authors</div>,
    };
  }, [data]);
  if (isLoading) {
    return (
      <Box height='100vh' display='flex' ai='center' jc='center'>
        <Loading />
      </Box>
    );
  }

  function onTabClick(e: React.SyntheticEvent<MouseEvent>) {
    const target = e.currentTarget as HTMLDivElement;
    setTab(target.id);
  }

  return (
    <LayoutContainer>
      <Box as='section' display='flex' css={{ gap: '$12' }}>
        <Box css={{ minWidth: 320 }}>
          <Card style={{ padding: '12px' }}>
            <Box display='flex' ai='center'>
              <Text
                as='h2'
                size='$8'
                css={{ mr: '$5', letterSpacing: 'unset' }}
              >
                {data.name}
              </Text>
            </Box>
            <Text color='$textPrimary50' size='$5' css={{ mb: '$4' }}>
              {data.affiliations[0]}
            </Text>
            {data.homepage && (
              <div>
                <Link href={data.homepage} target='_blank'>
                  <Text color='primary'>🔗 {data.homepage}</Text>
                </Link>
              </div>
            )}
            <Separator margin='$9' />
            <Box display='flex' fd='column' css={{ gap: '$4' }}>
              <Text size='$4'>Publications {data.papers.length} </Text>
              <Text size='$4'>h-index: {data.hIndex}</Text>
              <Text>Citations: {data.citationCount}</Text>
            </Box>
          </Card>
        </Box>
        <Box width='calc(100% - 340px)'>
          <AuthorTabs data={data} tab={tab} onTabClick={onTabClick} />
          <Box>{tabs[tab]}</Box>
        </Box>
      </Box>
    </LayoutContainer>
  );
}

export const getServerSideProps: GetServerSideProps<
  any,
  ParsedUrlQuery
> = async (context) => {
  const { id } = context.query;

  return {
    props: {
      id: id as string,
    },
  };
};
