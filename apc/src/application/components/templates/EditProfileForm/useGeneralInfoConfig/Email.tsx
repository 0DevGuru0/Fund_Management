import React from 'react';

import styled from 'styled-components';

import VerifiedIcon from '$application/assets/icons/check-circle.svg';
import Input from '$application/components/atoms/etc/Input';

interface EmailProps {
  title?: string;
  errorText?: string;
  width?: number;
  hint?: string;
  isVerified: boolean;
  onChange: (val: string) => void;
  value: string;
}
export const Email = ({ isVerified = false, ...props }: EmailProps) => {
  return (
    <Wrapper $width={props.width}>
      <Input value={props.value} onChange={props.onChange} />
      {isVerified && (
        <EmailVerified>
          <VerifiedIcon />
          <Text>verified</Text>
        </EmailVerified>
      )}
    </Wrapper>
  );
};
interface IWrapper {
  $width?: number;
}

const Wrapper = styled.div<IWrapper>`
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  position: relative;
`;
const EmailVerified = styled.div`
  position: absolute;
  top: 17px;
  right: 26px;
  display: flex;
  svg {
    width: 18px;
    height: 18px;
    use,
    path {
      fill: ${({ theme }) => theme.palette.secondaryMiddle};
    }
  }
`;
const Text = styled.div`
  margin-left: 3px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.secondaryMiddle};
`;
export default Email;
