import styled from 'styled-components';

export const Cell = styled.div`
  margin-bottom: 36px;
`;

export const Text = styled.div<{ bold?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: ${({ bold }) => (bold ? '600' : 'normal')};
  & > svg {
    use,
    path {
      fill: ${({ theme }) => theme.palette.grey['700']};
    }
  }
`;

export const BlackText = styled(Text)`
  color: black;
`;

export const Label = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey['800']};
  margin-bottom: 12px;
`;

export const IconWrapper = styled.div<{ $size: string }>`
  svg {
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;
  }
`;
