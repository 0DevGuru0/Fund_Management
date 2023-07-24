import React from 'react';

import FacebookSVGFill from '$application/assets/icons/facebook-fill.svg';
import FacebookSVG from '$application/assets/icons/facebook.svg';
import InstagramSVGFill from '$application/assets/icons/instagram-fill.svg';
import InstagramSVG from '$application/assets/icons/instagram.svg';
import LinkedInSVGFill from '$application/assets/icons/linkedin-fill.svg';
import LinkedInSVG from '$application/assets/icons/linkedin.svg';
import TwitterSVGFill from '$application/assets/icons/twitter-fill.svg';
import TwitterSVG from '$application/assets/icons/twitter.svg';

import { FooterConfig } from '../Footer';

const footerConfig: FooterConfig = {
  copyRightLink: 'https://notionwave.com/',
  textLinks: [
    { href: '/help', label: 'Help Center' },
    { href: 'https://notionwave.com/privacy-policy-2/', label: 'Privacy' },
    { href: 'https://notionwave.com/terms-and-conditions/', label: 'Terms' },
  ],
  iconLinks: [
    {
      label: 'Facebook',
      href: 'https://www.facebook.com/NotionWave/',
      icon: {
        default: <FacebookSVG />,
        hover: <FacebookSVGFill />,
      },
    },
    {
      label: 'Twitter',
      href: 'https://twitter.com/notionwave?lang=en',
      icon: {
        default: <TwitterSVG />,
        hover: <TwitterSVGFill />,
      },
    },
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/notionwave',
      icon: {
        default: <InstagramSVG />,
        hover: <InstagramSVGFill />,
      },
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/company/notionwave/',
      icon: {
        default: <LinkedInSVG />,
        hover: <LinkedInSVGFill />,
      },
    },
  ],
};

export default footerConfig;
