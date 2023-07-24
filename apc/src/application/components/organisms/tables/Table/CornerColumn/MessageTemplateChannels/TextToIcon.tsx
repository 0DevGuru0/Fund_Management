import Notification from '$application/assets/icons/bell-fill.svg';
import Https from '$application/assets/icons/https-fill.svg';
import Email from '$application/assets/icons/mail-fill.svg';
import Sms from '$application/assets/icons/message-circle-fill.svg';
import Teams from '$application/assets/icons/microsoft-teams-fill.svg';
import Telegram from '$application/assets/icons/telegram-fill.svg';
import WhatsApp from '$application/assets/icons/whatsapp-fill.svg';
import { ChannelsTypes } from '$application/components/pages/ManagementMessageTemplates/MessageTemplatesTable/channelTypes';

export const textToIcon = (channelName: ChannelsTypes) => {
  switch (channelName) {
    case ChannelsTypes.TEAMS:
      return <Teams />;
    case ChannelsTypes.EMAIL:
      return <Email />;
    case ChannelsTypes.SMS:
      return <Sms />;
    case ChannelsTypes.TELEGRAM:
      return <Telegram />;
    case ChannelsTypes.WHATSAPP:
      return <WhatsApp />;
    case ChannelsTypes.HTTPS:
      return <Https />;
    default:
      return <Notification />;
  }
};
