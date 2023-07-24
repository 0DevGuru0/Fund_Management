import React, { ReactNode } from 'react';

import Logo from '$application/assets/service-logos/iknito-sf.svg';

export type IContext = 'Admin' | 'SmartFund' | 'Researcher';

interface LogoType {
  fullName: string;
  logo: ReactNode;
}

type FooterVariations = {
  [key in IContext]: LogoType;
};

export const footerVariations: FooterVariations = {
  Admin: {
    logo: <Logo />,
    fullName: '',
  },
  SmartFund: {
    logo: <Logo />,
    fullName: 'Smart Fund Management System',
  },
  Researcher: {
    logo: <Logo />,
    fullName: 'Researcher System',
  },
};
