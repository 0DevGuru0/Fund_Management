import React from 'react';

import styled from 'styled-components';

const SuccessStep = () => {
  return <Text>The policy has been successfully registered in the system.</Text>;
};

export default SuccessStep;

const Text = styled.div`
  font-size: 16px;
  line-height: 1.5;
  color: ${({ theme }) => theme.palette.grey['800']};
`;
