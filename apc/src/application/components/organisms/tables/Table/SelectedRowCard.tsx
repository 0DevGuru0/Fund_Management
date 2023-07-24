import React, { FC } from 'react';

import { useAtomValue } from 'jotai/utils';
import { values } from 'lodash';
import { rgba } from 'polished';
import styled from 'styled-components';

import { selectedRowsAtom } from '$application/components/pages/Journals/JournalsList/store';

import Buttons from './SelectedRowCard/Buttons';

export interface SelectedRowCardProps {
  groupExists?: boolean;
  showGroupButton: boolean;
  totalRowsSelected?: number;
}

export const SelectedRowCard: FC<SelectedRowCardProps> = ({
  groupExists = false,
  showGroupButton,
  totalRowsSelected,
}) => {
  const selectedRows = useAtomValue(selectedRowsAtom);

  let numberOfSelected = values(selectedRows).filter(Boolean).length;
  if (totalRowsSelected) {
    numberOfSelected = totalRowsSelected;
  }

  return (
    <Container>
      <LabelsContainer>
        <Count>{String(numberOfSelected).padStart(2, '0')}</Count>
        Selected
      </LabelsContainer>
      <Buttons groupExists={groupExists} showGroupButton={showGroupButton} />
    </Container>
  );
};

export default SelectedRowCard;

const Container = styled.div`
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  width: inherit;
  padding: 24px 36px;
  position: absolute;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: 0 -6px 20px 0 ${({ theme }) => rgba(theme.palette.grey['500']!, 0.5)};
`;

const LabelsContainer = styled.div`
  flex: 1;
  font-size: 16px;
  line-height: 20px;
  width: max-content;
  color: ${({ theme }) => theme.palette.grey['800']};
`;

const Count = styled.div`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;
