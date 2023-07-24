import Aperture from '$application/assets/icons/aperture.svg';
import FileTextFill from '$application/assets/icons/file-text-fill.svg';
import FileText from '$application/assets/icons/file-text.svg';
import User2Fill from '$application/assets/icons/user-2-fill.svg';
import User2 from '$application/assets/icons/user-2.svg';

import { SidebarButtonProps } from './Button';

const sidebarsConfig: SidebarButtonProps[] = [
  {
    label: 'Your Profile',
    description: 'User avatar, General Information and Further Information',
    href: 'profile',
    icon: <User2 />,
    iconFilled: <User2Fill />,
    hasArrow: true,
    inNewTab: false,
  },
  {
    label: 'Help Center',
    description: '',
    href: '/help',
    icon: <Aperture />,
    iconFilled: <Aperture />,
    hasArrow: false,
    inNewTab: false,
  },
  {
    label: 'Terms and Service',
    description: '',
    href: 'https://notionwave.com/terms-and-conditions/',
    icon: <FileText />,
    iconFilled: <FileTextFill />,
    hasArrow: false,
    inNewTab: true,
  },
];

export default sidebarsConfig;
