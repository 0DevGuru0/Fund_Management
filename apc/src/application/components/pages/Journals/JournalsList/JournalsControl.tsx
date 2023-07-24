import React, { FC } from 'react';

import styled, { css } from 'styled-components';

import MoreSVG from '$application/assets/icons/more-horizontal.svg';
// import { Button } from '$application/components/atoms/buttons/Button';
import IconButton from '$application/components/atoms/buttons/IconButton';

interface JournalsControlProps {
  journalId?: string;
}

export const JournalsControl: FC<JournalsControlProps> = () => {
  return (
    <Container>
      {/* <AddButton
        // TODO: (Temporary) should be visible after AddJournal Modal
        color="primary"
        leftIcon="plus"
        customSize="md"
        title="Add Journal"
        variant="contained"
      /> */}
      <IconButton
        size="Lg"
        title="More"
        icon={<MoreSVG />}
        variant="Contained"
        color="Normal"
        onClick={() => {
          // eslint-disable-next-line no-console
          console.log('More Clicked');
        }}
        style={iconButtonStyle}
      />
    </Container>
  );
};

export default JournalsControl;

const Container = styled.div`
  display: flex;
`;

const iconButtonStyle = css`
  margin-left: 12px;
`;

// const AddButton = styled(Button)`
//   width: 160px;
//   height: 48px;
// `;
