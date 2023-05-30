import { GetServerSideProps, NextPage } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { useQuery } from 'react-query';

import { Avatar, Card, Link, Loading, Tooltip } from '@nextui-org/react';

import { Box, Text } from '@/components/kit';
import LayoutContainer from '@/config/stitches/foundations/layout';
import Graph from '@/components/PaperGraph/PaperGraph';
import { mock } from '@/components/PaperGraph/mockPaperData';

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
    const referencesWithCitations = mock?.references?.map(
      (reference: any, index: number) => {
        // const citations = referencesData?.find(
        //   (citation: any) => citation?.paperId === reference.paperId,
        // )?.citations;

        return {
          id: reference.paperId,
          title: reference.title,
          year: reference.year,
          type: 'reference',
          link: reference.url,
          x: index + 6,
          y: 50,
          citations: reference.citations,
        };
      },
    );

    const citationsWithCitations = mock?.citations?.map(
      (citation: any, index: number) => {
        // const citations = citationsData?.find(
        //   (c: any) => c?.paperId === citation.paperId,
        // )?.citations;

        return {
          id: citation.paperId,
          title: citation.title,
          year: citation.year,
          type: 'citation',
          link: `https://www.semanticscholar.org/paper/${citation.paperId}`,
          x: index + 6,
          y: -50,
          citations: citation.citations,
        };
      },
    );

    const mainData = {
      id: mock?.paperId,
      title: mock?.title,
      year: mock?.year,
      type: 'main',
      link: mock?.url,
      x: 0,
      y: 0,
      citations: citationsWithCitations,
      references: referencesWithCitations,
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

    // Add the citation links between the nodes
    const links = [];

    nodes.forEach((sourceNode) => {
      sourceNode.citations?.forEach((targetPaperId: string) => {
        const targetNode = nodes.find((node) => node.id === targetPaperId);
        if (targetNode) {
          // Check if the link already exists
          console.log(sourceNode.id, targetNode.id);
          const linkExists = links.find(
            (link) =>
              (link.source.id === sourceNode.id &&
                link.target.id === targetNode.id) ||
              (link.source.id === targetNode.id &&
                link.target.id === sourceNode.id),
          );

          // If the link doesn't exist, add it to the links array
          if (!linkExists) {
            links.push({
              source: sourceNode,
              target: targetNode,
            });
          }
        }
      });
    });
    console.log(nodes);
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
        <Box p='0 $9' display='flex'>
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
