import { Box } from '@/components/kit';

import PublicationCard from './PublicationCard';

function Publications({ papers }: any) {
  return (
    <Box display='flex' fd='column' css={{ gap: '$5' }}>
      {papers.map((paper: any) => (
        <PublicationCard key={paper.paperId} paper={paper} />
      ))}
    </Box>
  );
}

export default Publications;
