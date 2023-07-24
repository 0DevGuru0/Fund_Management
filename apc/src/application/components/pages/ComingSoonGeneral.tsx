import React from 'react';

import { Button } from '@iin/pubnito-components';
import { NextPage } from 'next';
import styled from 'styled-components';

import ComingSoonHolder from '$application/components/atoms/etc/ComingSoonHolder';

interface ComingSoonProps {
  description?: string;
}
export const ComingSoonPage: NextPage<ComingSoonProps> = ({ description }) => {
  return (
    <Container>
      <ComingSoonHolder
        description={description || ''}
        actionButton={
          <Button title="Notify Me" color="default" customSize="lg" variant="contained" />
        }
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
`;

export default ComingSoonPage;
