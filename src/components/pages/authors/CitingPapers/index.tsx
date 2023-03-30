import React from 'react';
import { usePagination } from 'react-use-pagination';

import { Pagination } from '@nextui-org/react';

import { Box } from '@/components/kit';

import PublicationCard from '../Publications/PublicationCard';

function CitingAuthors({ data }: any) {
  const { currentPage, totalPages, setPage, startIndex, endIndex } =
    usePagination({ totalItems: data.length, initialPageSize: 15 });

  const currentItems = React.useMemo(() => {
    return data.slice(startIndex, endIndex);
  }, [data, startIndex, endIndex]);

  return (
    <Box display='flex' fd='column' css={{ gap: '$9' }}>
      <Box
        height='100%'
        css={{ overflow: 'auto', maxHeight: 'calc(100vh - 224px)' }}
      >
        {currentItems.map((paper: any) => (
          <PublicationCard key={paper.paperId} paper={paper} />
        ))}
      </Box>
      <Pagination page={currentPage} onChange={setPage} total={totalPages} />
    </Box>
  );
}

export default CitingAuthors;
