import React from 'react';

import { rest } from 'msw';

import { StoryFC } from '$application/components/StoryFC';
import { ServiceProps } from '$application/utils/msw/useMockRequest';

import { Sample } from './Sample';

export default {
  title: 'Samples / MSW',
  component: Sample,
};

const mockServiceAddress = 'https://sample.com/api/test/';

export const TestResponse: StoryFC<ServiceProps> = (args) => {
  return <Sample {...args} />;
};

TestResponse.parameters = {
  zeplinLink: '',
  msw: [
    rest.get(`${mockServiceAddress}`, (req, res, ctx) => {
      return res(
        ctx.delay(1000),
        ctx.json({
          results: [
            { name: 'User1', email: 'user1@gmail.com' },
            { name: 'User2', email: 'user2@gmail.com' },
          ],
        }),
      );
    }),
  ],
};

TestResponse.args = {
  address: mockServiceAddress,
};

export const TestError = TestResponse.bind({});

TestError.args = {
  address: mockServiceAddress,
};

TestError.parameters = {
  zeplinLink: '',
  msw: [
    rest.get(`${mockServiceAddress}`, (req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(403));
    }),
  ],
};
