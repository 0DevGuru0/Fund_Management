import React, { useState } from 'react';

import BellIcon from '$application/assets/icons/bell-fill.svg';
import MailIcon from '$application/assets/icons/mail-fill.svg';
import MessageCircleIcon from '$application/assets/icons/message-circle-fill.svg';
import TelegramIcon from '$application/assets/icons/telegram-fill.svg';
import WhatsappIcon from '$application/assets/icons/whatsapp-fill.svg';
import { StoryFC } from '$application/components/StoryFC';

import { ToggleSelect, ToggleSelectProps, ToggleItem } from './ToggleSelect';

export default {
  title: 'Organisms / Table / ToggleSelect',
  component: ToggleSelect,
  parameters: {
    zeplinLink: [
      {
        name: 'Image Toggle',
        link:
          'https://app.zeplin.io/project/60865602084a7012b372e417/screen/610a34a60c31afb07aba913e',
      },
      {
        name: 'Icon Toggle',
        link:
          'https://app.zeplin.io/project/60865602084a7012b372e417/screen/61122a66501c2f1323e8b25c',
      },
    ],
  },
};

const iconItems: ToggleItem[] = [
  { title: 'E-Mail', innerItem: <MailIcon /> },
  { title: 'Notification', innerItem: <BellIcon /> },
  { title: 'SMS', innerItem: <MessageCircleIcon /> },
  { title: 'Telegram', innerItem: <TelegramIcon /> },
  { title: 'Whatsapp', innerItem: <WhatsappIcon /> },
];

const imageItems: ToggleItem[] = [
  { title: 'Hamid', innerItem: 'https://github.com/hamidfzm.png' },
  { title: 'Ali', innerItem: 'https://github.com/alitourani.png' },
  { title: 'HamidReza', innerItem: 'https://github.com/hrkhosravi.png' },
  { title: 'Someone' },
];

export const Images: StoryFC<ToggleSelectProps> = (args) => {
  const [selectedItems, setSelectedItems] = useState(args.selectedItems);

  const handleSelectOption = (item: string) => {
    const updatedList = selectedItems.includes(item)
      ? selectedItems.filter((element) => element !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedList);
    args.onSelect(item);
  };

  return (
    <ToggleSelect {...args} selectedItems={selectedItems} onSelect={handleSelectOption} />
  );
};

export const Icons = Images.bind({});
export const IconsLongList = Images.bind({});

Images.args = {
  selectedItems: [],
  items: imageItems,
};

Icons.args = {
  selectedItems: [],
  items: iconItems,
};

IconsLongList.args = {
  threshold: 3,
  selectedItems: [],
  items: iconItems,
};
