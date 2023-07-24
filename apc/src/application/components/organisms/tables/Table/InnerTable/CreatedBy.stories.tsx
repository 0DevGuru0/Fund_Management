import React from 'react';

import dayjs from 'dayjs';
import styled from 'styled-components';

import { StoryFC } from '$application/components/StoryFC';

import { CreatedBy, CreatedByProps } from './CreatedBy';

export default {
  title: 'Organisms / Table / CreatedBy',
  component: CreatedBy,
};

export const Default: StoryFC<Omit<CreatedByProps, 'date'>> = (args) => {
  const formattedDate = dayjs(new Date(2021, 2, 28)).format('DD MMM YYYY');

  return (
    <Table>
      <TableCell>
        <CreatedBy {...args} date={formattedDate} />
      </TableCell>
    </Table>
  );
};

Default.args = {
  name: 'Ora Clayton',
  image: '/defaultUser.png',
};

export const LongName = Default.bind({});

LongName.args = {
  name: 'Benicio Monserrate Rafael del Toro Sánchez',
  image: '/defaultUser.png',
};

export const Stretched: StoryFC<Omit<CreatedByProps, 'date'>> = (args) => {
  const formattedDate = dayjs(new Date(2021, 2, 28)).format('DD MMM YYYY');

  return (
    <Table>
      <TableCell>
        <CreatedBy {...args} date={formattedDate} />
      </TableCell>
      <TableCell>
        <CreatedBy
          {...args}
          date={formattedDate}
          name="Benicio Rafael del Toro Sánchez"
        />
      </TableCell>
    </Table>
  );
};

Stretched.args = {
  name: 'Ora Clayton',
  image: '/defaultUser.png',
};

const zeplinLink = [
  {
    name: 'Title Renderer',
    link:
      'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac80d5884c16a18d2b7f44',
  },
];

Default.parameters = {
  zeplinLink,
};

LongName.parameters = {
  zeplinLink,
};

Stretched.parameters = {
  zeplinLink,
};

const TableCell = styled.div`
  padding: 24px;
  padding-bottom: 28px;
  background-color: rgba(249, 249, 249, 0.5);
`;

const Table = styled.div`
  row-gap: 5px;
  display: grid;
  width: max-content;
  grid-template-columns: 1fr;
`;
