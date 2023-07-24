import React, { FC } from 'react';

import { rgba } from 'polished';
import styled, { css } from 'styled-components';

// import MoreSVG from '$application/assets/icons/more-vertical.svg';
import { taskToColor } from '$application/lib/taskToColor';

export interface ItemStateProps {
  label: keyof typeof taskToColor;
  isHovered?: boolean;
}

export const ItemState: FC<ItemStateProps> = ({ label }) => {
  return (
    <>
      <Container>
        <State variant={taskToColor[label]}>{label}</State>
        {/* {isHovered && (
          // TODO: Should be replaced by implemented Icon Buttons
          <MoreButton>
            <MoreSVG />
          </MoreButton>
        )} */}
      </Container>
    </>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  position: relative;
  margin-right: 24px;
  background-color: transparent;
`;

interface StatusProps {
  variant: string;
}

const State = styled.div<StatusProps>`
  margin: auto 0;
  padding: 3px 12px;
  line-height: 18px;
  font-weight: bold;
  text-align: center;
  border-radius: 4px;
  width: max-content;
  ${({ variant }) => {
    return css`
      color: ${variant};
      border: 1px ${variant} solid;
      background-color: ${rgba(variant, 0.08)};
    `;
  }}
`;

// const MoreButton = styled.div`
//   width: 18px;
//   height: 18px;
//   padding: 3px;
//   margin: auto;
//   cursor: pointer;
//   margin-right: 0;
//   border-radius: 5px;
//   background-color: ${({ theme }) => theme.background.secondary};
//   & > svg {
//     width: 18px;
//     height: 18px;
//     margin: auto;
//   }
//   & > svg path,
//   use {
//     fill: ${({ theme }) => theme.text.contrast.primary};
//   }
//   &:hover {
//     cursor: pointer;
//     background-color: ${({ theme }) => theme.cmp.button.tertiary};
//     & > svg path,
//     use {
//       fill: ${({ theme }) => theme.palette.primary};
//     }
//   }
// `;
