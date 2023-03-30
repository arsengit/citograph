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
import CitingAuthors from '@/components/pages/authors/CitingPapers';
import ReferencedAuthors from '@/components/pages/authors/ReferencedPapers';

const fetchAuthorById = async (id: string) => {
  const author = await fetch(
    `https://api.semanticscholar.org/graph/v1/author/${id}?fields=name,url,aliases,affiliations,homepage,paperCount,citationCount,hIndex,papers.paperId,papers.title,papers.abstract,papers.venue,papers.year,papers.citationCount,papers.fieldsOfStudy,papers.externalIds,papers.authors`,
  ).then((res) => res.json());
  return {
    ...author,
  };
};

const fetchPaperByAuthorId = async (id: string) => {
  const paper = await fetch(
    `https://api.semanticscholar.org/graph/v1/author/${id}/papers?fields=title,abstract,year,venue,openAccessPdf,authors,citations,citations.paperId,citations.title,citations.citationCount,citations.influentialCitationCount,citations.year,citations.authors,citations.abstract,references.authors,references.paperId,references.title,references.url,references.venue,references.year,references.citationCount,references.influentialCitationCount,references.abstract`,
  ).then((res) => res.json());
  return {
    ...paper,
  };
};

export default function Author({ id }: any) {
  const [tab, setTab] = React.useState('publications');
  const { data, isLoading, error } = useQuery(['author', id], () =>
    fetchAuthorById(id),
  );

  const { data: papers, isLoading: papersLoading } = useQuery(
    ['papers', id],
    () => fetchPaperByAuthorId(id),
  );

  const papersData = React.useMemo(() => {
    const citationsMap = new Map();
    const referencesMap = new Map();

    papers?.data?.forEach((paper: any) => {
      paper.citations.forEach((citation: any) => {
        if (!citationsMap.has(citation.paperId)) {
          citationsMap.set(citation.paperId, citation);
        }
      });
      paper.references.forEach((reference: any) => {
        if (!referencesMap.has(reference.paperId)) {
          referencesMap.set(reference.paperId, reference);
        }
      });
    });

    const citations = Array.from(citationsMap.values()).sort(
      (a: any, b: any) => b.citationCount - a.citationCount,
    );
    const references = Array.from(referencesMap.values()).sort(
      (a: any, b: any) => b.citationCount - a.citationCount,
    );

    return {
      citations,
      references,
    };
  }, [papers]);
  const tabs = React.useMemo(() => {
    return {
      publications: <Publications papers={data?.papers} />,
      citingPapers: <CitingAuthors data={papersData?.citations} />,
      referencedPapers: <ReferencedAuthors data={papersData?.references} />,
    };
  }, [data?.papers, papersData]);

  if (isLoading) {
    return (
      <Box height='100vh' display='flex' ai='center' jc='center'>
        <Loading />
      </Box>
    );
  }

  function onTabClick(e: React.SyntheticEvent<MouseEvent>) {
    const target = e?.currentTarget as any;
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
          <AuthorTabs
            papersData={papersData}
            data={data}
            tab={tab}
            onTabClick={onTabClick}
          />
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
