import React from 'react';

import { action } from '@storybook/addon-actions';

import EditSVG from '$application/assets/icons/edit.svg';
import EditSVGFill from '$application/assets/icons/publisher-fill.svg';
import ShareFillSVG from '$application/assets/icons/share-fill.svg';
import ShareSVG from '$application/assets/icons/share.svg';
import TrashSVGFill from '$application/assets/icons/trash-fill.svg';
import TrashSVG from '$application/assets/icons/trash.svg';
import { StoryFC } from '$application/components/StoryFC';
import { getThemes } from '$application/theme/getThemes';

import { Options, OptionsProps } from './Options';

const theme = getThemes().LightBase;

export default {
  title: 'Atoms / Controls / Options',
  component: Options,
  parameters: { background: { noPadding: true } },
};

export const Default: StoryFC<OptionsProps> = (args) => {
  return <Options {...args} />;
};

Default.args = {
  actions: [
    {
      icon: {
        default: <EditSVG />,
        hover: <EditSVGFill />,
      },
      label: 'Edit',
      hoverColor: {
        background: theme.cmp.button.tertiary,
        icon: theme.palette.primary,
      },
      onClick: action('Edit Clicked'),
    },
    {
      icon: {
        default: <ShareSVG />,
        hover: <ShareFillSVG />,
      },
      label: 'Share',
      hoverColor: {
        background: theme.cmp.button.tertiary,
        icon: theme.palette.primary,
      },
      onClick: action('Share Clicked'),
    },
    {
      icon: {
        default: <TrashSVG />,
        hover: <TrashSVGFill />,
      },
      label: 'Delete',
      hoverColor: {
        background: theme.cmp.header.logout,
        icon: theme.badge,
      },
      onClick: action('Delete Clicked'),
    },
  ],
};

export const NoIcon = Default.bind({});

NoIcon.args = {
  actions: [
    {
      label: 'Edit',
      onClick: action('Edit Clicked'),
    },
    {
      label: 'Share',
      onClick: action('Share Clicked'),
    },
    {
      label: 'Delete',
      onClick: action('Delete Clicked'),
    },
  ],
};

export const WithHeader = Default.bind({});

WithHeader.args = {
  header: 'Other pages',
  actions: [
    {
      label: 'Edit',
      onClick: action('Edit Clicked'),
    },
    {
      label: 'Share',
      onClick: action('Share Clicked'),
    },
    {
      label: 'Delete',
      onClick: action('Delete Clicked'),
    },
  ],
};

const zeplinLink =
  'https://app.zeplin.io/project/60a1f710d2773f25c226fd39/screen/60ac806418edbb04cf1593e5';

Default.parameters = {
  zeplinLink,
};

NoIcon.parameters = {
  zeplinLink,
};

WithHeader.parameters = {
  zeplinLink,
};
