import React from 'react';

import styled from 'styled-components';

import Button from './ProfileSidebar/Button';
import sidebarsConfig from './ProfileSidebar/sidebar.config';

export const ProfileSidebar = () => (
  <Container>
    {sidebarsConfig.map((item, index) => (
      <Button key={index} {...item} />
    ))}
  </Container>
);

const Container = styled.div`
  display: flex;
  width: 369px;
  flex-direction: column;
  padding: 36px;
  box-sizing: border-box;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.background.primary};
  box-shadow: 0 2px 6px 0 ${({ theme }) => theme.palette.primaryLight};
`;
