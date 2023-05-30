import React from 'react';

import { Grid } from '@nextui-org/react';

import TabItem from './TabItem/TabItem';

function AuthorTabs({ data, tab, onTabClick }: any) {
  const cardsList = React.useMemo(() => {
    return [
      {
        title: 'Publications',
        value: data?.papers?.length,
        id: 'publications',
      },
      {
        title: 'Citing Authors',
        value: data?.citationCount,
        id: 'citing-authors',
      },
      {
        title: 'Referenced Authors',
        value: data?.citationCount,
        id: 'referenced-authors',
      },
      {
        title: 'Co-Authors',
        value: data?.citationCount,
        id: 'co-authors',
      },
    ];
  }, [data]);

  return (
    <Grid.Container gap={1} justify='center'>
      {cardsList.map((card) => (
        <TabItem key={card.id} card={card} tab={tab} onTabClick={onTabClick} />
      ))}
    </Grid.Container>
  );
}

export default AuthorTabs;
