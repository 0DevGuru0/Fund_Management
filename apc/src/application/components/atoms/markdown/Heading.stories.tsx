import React from 'react';

import Heading, { HeadingProps } from './Heading';

export default {
  title: 'Atoms / Markdown / Headings',
  component: Heading,
  parameters: {
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/6180fe088b96f0bdb58fe811',
  },
};

const args: HeadingProps[] = [
  {
    variant: 'h1',
    children: 'H1',
  },
  {
    variant: 'h2',
    children: 'H2',
  },
  {
    variant: 'h3',
    children: 'H3',
  },
  {
    variant: 'h4',
    children: 'H4',
  },
  {
    variant: 'h5',
    children: 'H5',
  },
  {
    variant: 'h6',
    children: 'H6',
  },
];

export const Headings = () => {
  const headings = args.map((arg, key) => {
    return <Heading key={key} {...arg} />;
  });

  return <>{headings}</>;
};
