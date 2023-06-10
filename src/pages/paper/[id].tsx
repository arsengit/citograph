import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useQuery } from 'react-query';

import {
  Avatar,
  Button,
  Card,
  Grid,
  Link,
  Loading,
  Tooltip,
} from '@nextui-org/react';
import dynamic from 'next/dynamic';

import { Box, Text } from '@/components/kit';
import LayoutContainer from '@/config/stitches/foundations/layout';
import PublicationCard from '@/components/pages/authors/Publications/PublicationCard';
import Tabs from '@/components/kit/Tabs';
import CitationItem from '@/components/pages/papers/CitationItem/CitationItem';

const Graph = dynamic(() => import('@/components/PaperGraph/PaperGraph'), {
  ssr: false,
});
type PaperPageProps = {
  id: string;
};

const fetchMainPaperById = async (id: string) => {
  const paper = await fetch(
    `https://api.semanticscholar.org/graph/v1/paper/${id}?fields=title,abstract,year,venue,openAccessPdf,authors,citations,citations.paperId,citations.title,citations.citationCount,citations.influentialCitationCount,citations.year,citations.authors,references.authors,references.paperId,references.title,references.url,references.venue,references.year,references.citationCount,references.influentialCitationCount,references.abstract`,
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

const fetchCitations = async (paper: any) => {
  return Promise.all(
    paper?.citations.map((citation: any) =>
      fetch(
        `https://api.semanticscholar.org/graph/v1/paper/${citation.paperId}?fields=title,citations.paperId`,
        {
          headers: {
            'x-api-key': 'zhNIU4U4Ne4AUz7ZNNpTR6boDRDK8liM4TVw2EFU',
          },
        },
      )
        .then((res) => res.json())
        .catch(() => null),
    ),
  );
};

const fetchReferences = async (paper: any) => {
  return Promise.all(
    paper?.references.map((reference: any) =>
      fetch(
        `https://api.semanticscholar.org/graph/v1/paper/${reference.paperId}?fields=title,citations.paperId`,
        {
          headers: {
            'x-api-key': 'zhNIU4U4Ne4AUz7ZNNpTR6boDRDK8liM4TVw2EFU',
          },
        },
      )
        .then((res) => res.json())
        .catch(() => null),
    ),
  );
};

const PaperPage: NextPage<PaperPageProps> = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useQuery(['paper', id], () =>
    fetchMainPaperById(id),
  );
  const { data: citationsData, isLoading: citationsIsLoading } = useQuery(
    ['citations', data],
    () => fetchCitations(data),
  );
  const { data: referencesData, isLoading: referencesIsLoading } = useQuery(
    ['references', data],
    () => fetchReferences(data),
  );

  const processedData = React.useMemo(() => {
    const referencesWithCitations = data?.references.map((reference: any) => {
      const citations = referencesData?.find(
        (citation: any) => citation?.paperId === reference.paperId,
      );

      return {
        ...reference,
        citations: citations?.citations,
      };
    });

    const citationsWithCitations = data?.citations.map((citation: any) => {
      const citations = citationsData?.find(
        (c: any) => c?.paperId === citation.paperId,
      );

      return {
        ...citation,
        citations: citations?.citations,
      };
    });

    return {
      ...data,
      citations: citationsWithCitations,
      references: referencesWithCitations,
    };
  }, [data, referencesData, citationsData]);

  const combinedData = React.useMemo(() => {
    const allReferencesCitationsKeys = {};
    const allCitationsCitationsKeys = {};
    const links = [];
    console.log(processedData);
    if (processedData?.references?.length > 0) {
      for (let i = 0; i < processedData?.references?.length; i++) {
        if (processedData?.references[i].citations?.length > 0) {
          for (
            let j = 0;
            j < processedData.references[i].citations.length;
            j++
          ) {
            if (
              !allReferencesCitationsKeys[
                processedData.references[i].citations[j].paperId
              ]
            ) {
              allReferencesCitationsKeys[
                processedData.references[i].citations[j].paperId
              ] = processedData.references[i].paperId;
            }
          }
        }
      }
      for (let i = 0; i < processedData.citations.length; i++) {
        if (processedData.citations[i].citations?.length > 0) {
          for (
            let j = 0;
            j < processedData.citations[i].citations.length;
            j++
          ) {
            if (
              !allCitationsCitationsKeys[
                processedData.citations[i].citations[j].paperId
              ]
            ) {
              allCitationsCitationsKeys[
                processedData.citations[i].citations[j].paperId
              ] = processedData.citations[i].paperId;
            }
          }
        }
      }

      const referencesWithCitations = processedData?.references?.map(
        (reference: any, index: number) => {
          if (reference.paperId !== null && processedData.paperId) {
            links.push({
              id: `${reference.paperId}-${processedData.paperId}`,
              source: reference.paperId || 1,
              target: processedData.paperId,
              size: 1,
            });
          }

          if (reference.influentialCitationCount > 300) {
            const keysToCitations = new Set();
            reference.citations?.slice(0, 15).forEach((citation: any) => {
              if (allCitationsCitationsKeys[citation.paperId]) {
                keysToCitations.add(
                  allCitationsCitationsKeys[citation.paperId],
                );
              }
            });
            keysToCitations.forEach((key: any) => {
              if (
                !links.find(
                  (link) =>
                    (link.source === reference.paperId &&
                      link.target === key) ||
                    (link.source === key && link.target === reference.paperId),
                )
              ) {
                if (key && reference.paperId !== null) {
                  links.push({
                    id: `${reference.paperId}-${key}`,
                    source: reference.paperId,
                    target: key,
                    size: 1,
                  });
                }
              }
            });
          }

          return {
            id: reference.paperId,
            title: reference.title,
            year: reference.year,
            label: reference.title,
            influence: reference.influentialCitationCount,
            type: 'reference',
            size: 8,
            fill: 'rgb(232, 193, 160)',
          };
        },
      );

      const citationsWithCitations = processedData?.citations?.map(
        (citation: any, index: number) => {
          if (citation.paperId !== null && processedData.paperId) {
            links.push({
              id: `${citation.paperId}-${processedData.paperId}`,
              source: citation.paperId,
              target: processedData.paperId,

              size: 1,
            });
          }

          if (citation.influentialCitationCount > 300) {
            const keysToCitations = new Set();

            citation.citations?.slice(0, 15).forEach((citation: any) => {
              if (allReferencesCitationsKeys[citation.paperId]) {
                keysToCitations.add(
                  allReferencesCitationsKeys[citation.paperId],
                );
              }
            });
            keysToCitations.forEach((key: any) => {
              if (
                !links.find(
                  (link) =>
                    (link.source === citation.paperId && link.target === key) ||
                    (link.source === key && link.target === citation.paperId),
                )
              ) {
                if (citation.paperId !== null && key) {
                  links.push({
                    id: `${citation.paperId}-${key}`,
                    source: citation.paperId,
                    target: key,
                    size: 1,
                  });
                }
              }
            });
          }
          return {
            id: citation.paperId,
            title: citation.title,
            year: citation.year,
            type: 'citation',
            label: citation.title,
            height: 1,
            size: 8,
            fill: 'rgb(97, 205, 187)',
          };
        },
      );

      const mainData = {
        id: processedData?.paperId,
        title: processedData?.title,
        year: processedData?.year,
        label: processedData?.title,
        type: 'main',
        height: 10,
        size: 12,
        fill: 'rgb(244, 117, 96)',
      };

      // Merge and deduplicate the references, citations and main data
      const nodes = [
        mainData,
        ...(referencesWithCitations || []),
        ...(citationsWithCitations || []),
      ].reduce((prev: any, curr: any) => {
        const exist = prev.find((node: any) => node.id === curr.id);
        if (exist) {
          exist.citations = [
            ...(exist.citations || []),
            ...(curr.citations || []),
          ];
          return prev;
        } else {
          return [...prev, curr];
        }
      }, []);
      return { nodes, links };
    }
    return { nodes: [], links: [] };
  }, [processedData]);

  console.log(combinedData);

  return (
    <Box>
      {isLoading || citationsIsLoading || referencesIsLoading ? (
        <Box height='100vh' display='flex' ai='center' jc='center'>
          <Loading />
        </Box>
      ) : (
        <Box display='flex' p='0 $9'>
          <Box css={{ minWidth: '460px' }} width='460px'>
            <Card css={{ padding: '$11 $9' }}>
              <Text
                css={{ flex: 1, display: 'flex', ai: 'center', mb: '$5' }}
                size='$4'
                weight='$4'
                as='h3'
              >
                <Box as='span' flex={1}>
                  {processedData?.title}
                </Box>
                <Tooltip css={{ width: '140px' }} content='Read the paper'>
                  <Link
                    css={{ fontSize: '24px' }}
                    target='_blank'
                    href={processedData?.openAccessPdf?.url}
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
                size='$3'
                color='$secondary'
                as='p'
              >
                {processedData?.abstract}
              </Text>
              <Box mt='$5' display='flex' css={{ gap: '$4' }}>
                {processedData?.authors?.map((author: any) => (
                  <Tooltip key={author.authorId} content={author.name}>
                    <Avatar
                      size='sm'
                      squared
                      key={author.authorId}
                      text={author.name}
                    />
                  </Tooltip>
                ))}
              </Box>
            </Card>
            <Box width='460px' display='flex' ai='center' jc='space-between'>
              <Tabs
                tabs={[
                  {
                    label: 'Citations',
                    value: 'citations',
                    content: (
                      <Box
                        css={{
                          maxHeight: 'calc(100vh - 330px)',
                          overflow: 'auto',
                        }}
                      >
                        {processedData.citations.map((paper: any) => (
                          <CitationItem key={paper.paperId} data={paper} />
                        ))}
                      </Box>
                    ),
                  },
                  {
                    label: 'References',
                    value: 'references',
                    content: (
                      <Box
                        css={{
                          maxHeight: 'calc(100vh - 330px)',
                          overflow: 'auto',
                        }}
                      >
                        {processedData.references.map((paper: any) => (
                          <CitationItem key={paper.paperId} data={paper} />
                        ))}
                      </Box>
                    ),
                  },
                ]}
              />
            </Box>
          </Box>
          {combinedData?.nodes?.length > 0 && <Graph data={combinedData} />}
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
