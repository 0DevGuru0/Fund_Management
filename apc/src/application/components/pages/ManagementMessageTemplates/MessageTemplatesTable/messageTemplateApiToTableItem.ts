import { compact, findKey, flow, uniq } from 'lodash';

import { TextType } from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { GetMessageTemplates200MessageTemplatesItem } from '$application/lib/generated/apcApi.schemas';

import { ChannelsTypes } from './channelTypes';
import { MessageTemplateItemType } from './config';

export const messageTemplateApiToTableItem = (
  messageTemplates: GetMessageTemplates200MessageTemplatesItem[],
): MessageTemplateItemType[] => {
  return messageTemplates.map((template) => {
    const { id, body, channels } = template;

    const channelsList = (channels ?? []).map((channel) => {
      const channelTypeKey = findKey(
        ChannelsTypes,
        (type) => type.toUpperCase() === channel.type.toUpperCase(),
      );
      return ChannelsTypes[channelTypeKey ?? ''];
    });
    const uniqChannelsList = flow(uniq, compact)(channelsList);

    return {
      id: {
        id: id ?? '-',
        title: id ?? '-',
        isChecked: false,
      },
      channels: {
        threshold: 4,
        channels: uniqChannelsList,
      },
      body: {
        text: body ?? '-',
        textType: TextType.NormalDark,
      },
      state: {
        id: id!,
        label: 'Available',
      },
    };
  });
};
