import React, { FC, useState } from 'react';

import styled from 'styled-components';

import CoffeeSVG from '$application/assets/icons/coffee.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

import StartProcessModal from './StartProcessModal';

export const EmptyPage: FC = () => {
  const [showStartProcessModal, setShowStartProcessModal] = useState(false);

  return (
    <>
      <EmptyContentHolder
        icon={<NoRequests />}
        title="Dear Researcher"
        description="Submit for a Article Processing Charge Funding Request now!"
        actionButton={
          <Button
            title="Apply for Fund"
            color="primary"
            leftIcon="check"
            customSize="lg"
            variant="outlined"
            onClick={() => setShowStartProcessModal(true)}
          />
        }
      />
      {showStartProcessModal && (
        <StartProcessModal onCancel={() => setShowStartProcessModal(false)} />
      )}
    </>
  );
};

export default EmptyPage;

const NoRequests = styled(CoffeeSVG)`
  width: 250px;
  height: 200px;
`;
