import MessageTemplateChannels from '$application/components/organisms/tables/Table/CornerColumn/MessageTemplateChannels';
import { SimpleSelectableTitle } from '$application/components/organisms/tables/Table/CornerColumn/SimpleSelectableTitle';
import { FilterConfig } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import CommonText, {
  TextType,
} from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { taskToColor } from '$application/lib/taskToColor';

import { ChannelsTypes } from './channelTypes';
import MessageState from './MessageState';

// TODO: A new config to cover Selector Filter should be designed after implementing it in IW-583
export const messageTemplatesFiltersConfig: FilterConfig = {};

export interface MessageTemplateItemType {
  id: {
    id: string;
    title: string;
    index?: number;
    isChecked: boolean;
    onToggle?: (newState: boolean, id: string) => void;
  };
  channels: {
    threshold?: number;
    channels: ChannelsTypes[];
  };
  body: {
    text: string;
    textType: TextType;
  };
  state: {
    id: string;
    label: keyof typeof taskToColor;
  };
}

export const messageTemplatesTableDefinitions = [
  { width: '300px', column: 'id', label: 'ID', renderer: SimpleSelectableTitle },
  {
    width: '124px',
    column: 'channels',
    label: 'Channels',
    renderer: MessageTemplateChannels,
  },
  { width: '350px', column: 'body', label: 'Body', renderer: CommonText },
  { width: '213px', column: 'state', label: 'State', renderer: MessageState },
];
