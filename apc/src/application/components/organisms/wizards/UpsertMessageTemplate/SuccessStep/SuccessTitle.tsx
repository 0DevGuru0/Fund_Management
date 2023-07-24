import React from 'react';

import styled from 'styled-components';

import CheckIconSVG from '$application/assets/icons/check.svg';

export const SuccessTitle = () => (
  <IconWrapper>
    <Text>3. Success</Text>
    <CheckIconSVG />
  </IconWrapper>
);

const Text = styled.div`
  color: ${({ theme }) => theme.text.contrast.secondary};
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
`;

const IconWrapper = styled.div`
  display: flex;
  svg {
    margin-left: 6px;
    width: 24px;
    height: 24px;
    use,
    path {
      fill: ${({ theme }) => theme.palette.secondaryMiddle};
    }
  }
`;

export default SuccessTitle;
