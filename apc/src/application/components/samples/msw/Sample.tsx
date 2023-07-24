import React, { FC } from 'react';

import styled from 'styled-components';

import { Message, ServiceStatus } from '$application/components/atoms/etc/Message';
import { ServiceProps, useMockRequest } from '$application/utils/msw/useMockRequest';

export const Sample: FC<ServiceProps> = ({ address }) => {
  const { status, data, error } = useMockRequest(address);

  if (status === ServiceStatus.Loading) {
    return <Message status={status} message="Fetching items ..." />;
  }

  if (status === ServiceStatus.Error) {
    return <Message status={status} message={`${error}`} />;
  }

  return (
    <Message status={status}>
      {
        <>
          {data.map((item, key: number) => (
            <Item key={key}>
              {key + 1}. {JSON.stringify(item)}
            </Item>
          ))}
        </>
      }
    </Message>
  );
};

const Item = styled.div`
  margin-bottom: 5px;
`;
