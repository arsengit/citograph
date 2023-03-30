import { Card, Grid } from '@nextui-org/react';

import { Text } from '@/components/kit';

function TabItem({ card, tab, onTabClick }: any) {
  return (
    <Grid onClick={onTabClick} id={card.id} xs={4} key={card.id}>
      <Card
        css={{
          h: '$20',
          $$cardColor: tab === card.id ? '$colors$primary' : 'white',
          cursor: 'pointer',
        }}
      >
        <Card.Body>
          <Text
            size='$4'
            color={tab === card.id ? 'white' : 'black'}
            css={{ mt: 0 }}
          >
            {card.title} {card.value}
          </Text>
        </Card.Body>
      </Card>
    </Grid>
  );
}

export default TabItem;
