import React, { FC } from 'react';

import { isEmpty } from 'lodash';
import styled from 'styled-components';

import {
  JournalGroupCard,
  JournalGroupCardProps,
} from '$application/components/molecules/cards/JournalGroupCard';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

interface Props {
  cards: JournalGroupCardProps[];
}

export const JournalGroupsCards: FC<Props> = ({ cards }) => {
  const noCards = isEmpty(cards);

  return (
    <>
      {noCards ? (
        <EmptyContentHolder
          icon={<NoSearchResult src="/nothingToCompare.png" />}
          title="No Results Found"
          description="Try changing filters or the search term."
        />
      ) : (
        <Container>
          {cards.map((card, key) => (
            <JournalGroupCard key={key} {...card} />
          ))}
        </Container>
      )}
    </>
  );
};

export default JournalGroupsCards;

const Container = styled.div`
  display: grid;
  grid-gap: 24px;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
`;

const NoSearchResult = styled.img`
  width: 465px;
  height: 200px;
  margin-bottom: 12px;
`;
