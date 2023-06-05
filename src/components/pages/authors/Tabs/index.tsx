import React from 'react';

import { Grid } from '@nextui-org/react';

import TabItem from './TabItem/TabItem';

function AuthorTabs({ data, tab, papersData, onTabClick }: any) {
  const cardsList = React.useMemo(() => {
    return [
      {
        title: 'Publications',
        value: data?.papers?.length,
        id: 'publications',
      },
      {
        title: 'Citing Papers',
        value: papersData?.citations.length,
        id: 'citingPapers',
      },
      {
        title: 'Referenced Papers',
        value: papersData?.references.length,
        id: 'referencedPapers',
      },
    ];
  }, [
    data?.papers?.length,
    papersData?.citations.length,
    papersData?.references.length,
  ]);

  return (
    <Grid.Container gap={1} justify='center'>
      {cardsList.map((card) => (
        <TabItem key={card.id} card={card} tab={tab} onTabClick={onTabClick} />
      ))}
    </Grid.Container>
  );
}

export default AuthorTabs;
