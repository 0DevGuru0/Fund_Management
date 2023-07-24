import BellIcon from '$application/assets/icons/bell.svg';
import MailIcon from '$application/assets/icons/mail.svg';
import MessageCircleIcon from '$application/assets/icons/message-circle.svg';

export const textToIcon = (channelName: string) => {
  switch (channelName) {
    case 'notification':
      return <BellIcon />;
    case 'sms':
      return <MessageCircleIcon />;
    default:
      // email
      return <MailIcon />;
  }
};
