import React, { FC } from 'react';

import { HeaderConfig } from '../../Sidebar';

type Props = Extract<HeaderConfig, { kind: 'Profile' }> & {
  isOpen: boolean;
};

export const ProfileHeader: FC<Props> = (props) => {
  const { picture, title, subTitle, isOpen } = props;
  return (
    <div>
      {isOpen ? (
        <div>{picture}</div>
      ) : (
        <>
          <div>{picture}</div>
          <div>{title}</div>
          <div>{subTitle}</div>
        </>
      )}
    </div>
  );
};

export default ProfileHeader;
