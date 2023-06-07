import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useQuery } from 'react-query';

import { Avatar, Card, Link, Loading, Tooltip } from '@nextui-org/react';
import dynamic from 'next/dynamic';

import { Box, Text } from '@/components/kit';
import LayoutContainer from '@/config/stitches/foundations/layout';
// import Graph from '@/components/PaperGraph/PaperGraph';
import { mock } from '@/components/PaperGraph/mockPaperData';

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
  // const { data, isLoading, error } = useQuery(['paper', id], () =>
  //   fetchMainPaperById(id),
  // );
  // const { data: citationsData } = useQuery(['citations', data], () =>
  //   fetchCitations(data),
  // );
  // const { data: referencesData } = useQuery(['references', data], () =>
  //   fetchReferences(data),
  // );

  // const combinedData = React.useMemo(() => {
  //   const referencesWithCitations = data.references.map((reference: any) => {
  //     const citations = referencesData?.find(
  //       (citation: any) => citation?.paperId === reference.paperId,
  //     );

  //     return {
  //       ...reference,
  //       citations: citations?.citations,
  //     };
  //   });

  //   const citationsWithCitations = data.citations.map((citation: any) => {
  //     const citations = citationsData?.find(
  //       (c: any) => c?.paperId === citation.paperId,
  //     );

  //     return {
  //       ...citation,
  //       citations: citations?.citations,
  //     };
  //   });

  //   return {
  //     ...data,
  //     citations: citationsWithCitations,
  //     references: referencesWithCitations,
  //   };
  // }, [data, referencesData, citationsData]);

  // const combinedData = React.useMemo(() => {
  //   const referencesWithCitations = data?.references?.map(
  //     (reference: any, index: number) => {
  //       const citations = referencesData?.find(
  //         (citation: any) => citation?.paperId === reference.paperId,
  //       )?.citations;

  //       return {
  //         id: reference.paperId,
  //         title: reference.title,
  //         year: reference.year,
  //         type: 'reference',
  //         link: reference.url,
  //         x: (reference.year % 10) + index + 40,
  //         y: reference.year % 10,
  //         citations,
  //       };
  //     },
  //   );

  //   const citationsWithCitations = data?.citations?.map(
  //     (citation: any, index: number) => {
  //       const citations = citationsData?.find(
  //         (c: any) => c?.paperId === citation.paperId,
  //       )?.citations;

  //       return {
  //         id: citation.paperId,
  //         title: citation.title,
  //         year: citation.year,
  //         type: 'citation',
  //         link: `https://www.semanticscholar.org/paper/${citation.paperId}`,
  //         x: (citation.year % 10) - index - 40,
  //         y: (citation.year % 10) - 2,
  //         citations,
  //       };
  //     },
  //   );

  //   const mainData = {
  //     id: data?.paperId,
  //     title: data?.title,
  //     year: data?.year,
  //     type: 'main',
  //     link: data?.url,
  //     x: 0,
  //     y: 0,
  //     citations: citationsWithCitations,
  //     references: referencesWithCitations,
  //   };

  //   // Merge and deduplicate the references, citations and main data
  //   const nodes = [
  //     mainData,
  //     ...(referencesWithCitations || []),
  //     ...(citationsWithCitations || []),
  //   ].reduce((prev: any, curr: any) => {
  //     const exist = prev.find((node: any) => node.id === curr.id);
  //     if (exist) {
  //       exist.citations = [
  //         ...(exist.citations || []),
  //         ...(curr.citations || []),
  //       ];
  //       return prev;
  //     } else {
  //       return [...prev, curr];
  //     }
  //   }, []);

  //   // Add the citation links between the nodes
  //   const links = [];
  //   nodes.forEach((sourceNode) => {
  //     sourceNode.citations?.forEach((targetPaperId: string) => {
  //       const targetNode = nodes.find((node) => node.id === targetPaperId);
  //       if (targetNode) {
  //         links.push({
  //           source: sourceNode,
  //           target: targetNode,
  //         });
  //       }
  //     });
  //   });

  //   return { nodes, links };
  // }, [data, citationsData, referencesData]);

  const combinedData = React.useMemo(() => {
    const allReferencesCitationsKeys = {};
    const allCitationsCitationsKeys = {};
    const links = [];

    for (let i = 0; i < mock.references.length; i++) {
      if (mock.references[i].citations?.length > 0) {
        for (let j = 0; j < mock.references[i].citations.length; j++) {
          if (
            !allReferencesCitationsKeys[mock.references[i].citations[j].paperId]
          ) {
            allReferencesCitationsKeys[
              mock.references[i].citations[j].paperId
            ] = mock.references[i].paperId;
          }
        }
      }
    }
    for (let i = 0; i < mock.citations.length; i++) {
      if (mock.citations[i].citations?.length > 0) {
        for (let j = 0; j < mock.citations[i].citations.length; j++) {
          if (
            !allCitationsCitationsKeys[mock.citations[i].citations[j].paperId]
          ) {
            allCitationsCitationsKeys[mock.citations[i].citations[j].paperId] =
              mock.citations[i].paperId;
          }
        }
      }
    }

    const referencesWithCitations = mock?.references?.map(
      (reference: any, index: number) => {
        links.push({
          source: reference.paperId,
          target: mock.paperId,
          distance: 300,
        });

        if (reference.influentialCitationCount > 300) {
          const keysToCitations = new Set();
          reference.citations?.slice(0, 15).forEach((citation: any) => {
            if (allCitationsCitationsKeys[citation.paperId]) {
              keysToCitations.add(allCitationsCitationsKeys[citation.paperId]);
            }
          });
          keysToCitations.forEach((key: any) => {
            if (
              !links.find(
                (link) =>
                  (link.source === reference.paperId && link.target === key) ||
                  (link.source === key && link.target === reference.paperId),
              )
            ) {
              links.push({
                source: reference.paperId,
                target: key,
                distance: 100,
              });
            }
          });
        }

        return {
          id: reference.paperId,
          title: reference.title,
          year: reference.year,
          height: 1,
          type: 'reference',
          size: 12,
          color: 'rgb(232, 193, 160)',
          link: reference.url,
          x: index + 6,
          y: 50,
          // citations: reference.citations,
        };
      },
    );

    const citationsWithCitations = mock?.citations?.map(
      (citation: any, index: number) => {
        links.push({
          source: citation.paperId,
          target: mock.paperId,
          distance: 100,
        });

        if (citation.influentialCitationCount > 300) {
          const keysToCitations = new Set();

          citation.citations?.slice(0, 15).forEach((citation: any) => {
            if (allReferencesCitationsKeys[citation.paperId]) {
              keysToCitations.add(allReferencesCitationsKeys[citation.paperId]);
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
              links.push({
                source: citation.paperId,
                target: key,
                distance: 100,
              });
            }
          });
        }
        return {
          id: citation.paperId,
          title: citation.title,
          year: citation.year,
          // type: 'citation',
          height: 1,
          size: 12,
          color: 'rgb(97, 205, 187)',
          // link: `https://www.semanticscholar.org/paper/${citation.paperId}`,
          // x: index + 6,
          // y: -50,
          // citations: citation.citations,
        };
      },
    );

    const mainData = {
      id: mock?.paperId,
      title: mock?.title,
      year: mock?.year,
      type: 'main',
      height: 10,
      size: 32,
      color: 'rgb(244, 117, 96)',
      // link: mock?.url,
      // x: -300,
      // y: 0,
      // citations: citationsWithCitations,
      // references: referencesWithCitations,
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
  }, []);

  console.log(mock);
  return (
    <Box>
      {false ? (
        <Box height='100vh' display='flex' ai='center' jc='center'>
          <Loading />
        </Box>
      ) : (
        <Box p='0 $9'>
          {/* <LayoutContainer> */}
          <Box width='80%'>
            <Card css={{ padding: '$11 $9' }}>
              <Text
                css={{ flex: 1, display: 'flex', ai: 'center', mb: '$5' }}
                size='$10'
                as='h1'
              >
                <Box as='span' flex={1}>
                  {mock?.title}
                </Box>
                <Tooltip css={{ width: '140px' }} content='Read the paper'>
                  <Link
                    css={{ fontSize: '32px' }}
                    target='_blank'
                    href={mock?.openAccessPdf?.url}
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
                {mock?.abstract}
              </Text>
              <Box mt='$5' display='flex' css={{ gap: '$4' }}>
                {mock?.authors?.map((author: any) => (
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
          </Box>
          <Graph data={combinedData} />
          {/* </LayoutContainer> */}
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
