import React, { FC } from 'react';

import Link from 'next/link';
import styled, { css } from 'styled-components';

import ArrowSVG from '$application/assets/icons/arrow-left.svg';
// import MoreSVG from '$application/assets/icons/more-horizontal.svg';
import IconButton from '$application/components/atoms/buttons/IconButton';
import { taskToColor } from '$application/lib/taskToColor';
import { getUserRole } from '$application/utils/userRole';

interface JournalGroupControlProps {
  status: string;
  journalGroupName: string;
}

export const JournalGroupControl: FC<JournalGroupControlProps> = ({
  status,
  journalGroupName,
}) => {
  const { role } = getUserRole();
  let href = '/fundManager/journals?tab=Groups';

  if (role === 'SystemAdmin') {
    href = '/management/journals?tab=Groups';
  }
  // TODO: We should also add an "Add Journal" Button to this component, when AddJournal modal implemented
  return (
    <>
      <Link href={href}>
        <IconButton
          color="Primary"
          variant="WithText"
          icon={<ArrowSVG />}
          title="Back to Journal Groups"
        />
      </Link>
      <ControlContainer>
        <Text>
          <>{journalGroupName}</>
          <StatusContainer $color={taskToColor[status]}>{status}</StatusContainer>
        </Text>
        <Buttons>
          {/* <IconButton
            size="Lg"
            title="More"
            color="Normal"
            icon={<MoreSVG />}
            variant="Contained"
            onClick={() => {
              return '';
            }}
            style={iconButtonStyle}
          /> */}
        </Buttons>
      </ControlContainer>
    </>
  );
};

export default JournalGroupControl;

const ControlContainer = styled.div`
  display: flex;
  margin: 36px 0;
`;

const Text = styled.div`
  flex: 1;
  display: flex;
  margin: auto 0;
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Buttons = styled.div`
  display: flex;
`;

// const iconButtonStyle = css`
//   margin-left: 12px;
// `;

interface StatusProps {
  $color: string;
}

const StatusContainer = styled.div<StatusProps>`
  font-size: 14px;
  padding: 0 12px;
  font-weight: bold;
  margin-left: 12px;
  text-align: center;
  border-radius: 4px;
  width: max-content;
  ${({ $color }) => {
    return css`
      background-color: ${$color};
      color: ${({ theme }) => theme.background.primary};
    `;
  }}
`;
