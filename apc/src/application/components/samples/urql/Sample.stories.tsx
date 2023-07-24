import React from 'react';

import { graphql } from 'msw';

import { StoryFC } from '$application/components/StoryFC';

import { Sample } from './Sample';

export default {
  title: 'Samples / Urql',
  component: Sample,
};

export const UrqlCmp: StoryFC = (args) => {
  return <Sample {...args} />;
};

UrqlCmp.parameters = {
  zeplinLink: '',
  msw: [
    graphql.query('getSchemasName', (_req, res, ctx) =>
      res(
        ctx.delay(1000),
        ctx.data({
          schemas: [
            {
              name: 'Collection',
              label: { default: 'Collection' },
              description: 'Generic collection',
              _id: '607525366f089f0006e68125',
              isCollection: true,
            },
            {
              name: 'Organization',
              label: { default: 'Organization' },
              description: 'Organization',
              _id: '6083fade55b25f0006e3d887',
              isCollection: false,
            },
            {
              name: 'Journal',
              label: { default: 'Journal' },
              description: 'Journal',
              _id: '6083faf455b25f0006e3d888',
              isCollection: false,
            },
            {
              name: 'Fund',
              label: { default: 'Fund' },
              description: 'Fund',
              _id: '6083fb1555b25f0006e3d889',
              isCollection: false,
            },
          ],
        }),
      ),
    ),
  ],
};
