import React, { FC } from 'react';

import styled from 'styled-components';

interface Props {
  stepName: string;
}

export const Title: FC<Props> = ({ stepName }) => {
  return (
    <Wrapper>
      <Text>{stepName}</Text>
      <HandlebarLogo />
    </Wrapper>
  );
};

const Text = styled.div`
  color: ${({ theme }) => theme.text.contrast.primary};
  font-size: 20px;
  font-weight: bold;
  line-height: 1.2;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
`;
const HandlebarLogo = styled((props) => <img src="/handlebars_logo.png" {...props} />)`
  margin-right: 10px;
  width: 117px;
  height: 24px;
`;
export default Title;
