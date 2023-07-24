import React, { FC, useState } from 'react';

import styled from 'styled-components';

import FolderSVG from '$application/assets/icons/folder-fill.svg';
import { Button } from '$application/components/atoms/buttons/Button';

import StartProcessModal from './StartProcessModal';

export const ApplyForFund: FC = () => {
  const [showStartProcessModal, setShowStartProcessModal] = useState(false);

  return (
    <HintContainer>
      <FolderIcon />
      <div>
        <HintTitle>Dear Researcher</HintTitle>
        <HintText>
          The following illustration shows the flow of Fund Applications:
        </HintText>
      </div>
      <StyledButton
        title="Apply for Fund"
        variant="contained"
        color="primary"
        leftIcon="check"
        onClick={() => setShowStartProcessModal(true)}
      />
      {showStartProcessModal && (
        <StartProcessModal onCancel={() => setShowStartProcessModal(false)} />
      )}
    </HintContainer>
  );
};

export default ApplyForFund;

const StyledButton = styled(Button)`
  height: 48px;
`;

const HintContainer = styled.div`
  display: grid;
  padding: 36px 0;
  margin-bottom: 24px;
  grid-column-gap: 24px;
  grid-template-columns: 48px 1fr 185px;
`;

const HintTitle = styled.div`
  font-size: 20px;
  line-height: 24px;
  font-weight: bold;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const HintText = styled.div`
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.link.text};
`;

const FolderIcon = styled(FolderSVG)`
  width: 48px;
  height: 48px;
  path,
  use {
    fill: ${({ theme }) => theme.text.lowContrast};
  }
`;
