import React from 'react';

import styled from 'styled-components';

// import MoreSVG from '$application/assets/icons/more-horizontal.svg';
import { Button } from '$application/components/atoms/buttons/Button';

import useHandleWizardOpen from './useHandleWizardOpen';
// import { IconButton } from '$application/components/atoms/buttons/IconButton';

export const PoliciesControl = () => {
  const handleWizardOpen = useHandleWizardOpen();

  return (
    <Container>
      <Button
        color="primary"
        leftIcon="plus"
        customSize="lg"
        title="Add Policy"
        variant="contained"
        onClick={handleWizardOpen}
      />
      {/* <IconButton*/}
      {/*  variant="Contained"*/}
      {/*  icon={<MoreSVG />}*/}
      {/*  color="ToolPrimary"*/}
      {/*  size="Lg"*/}
      {/*  onClick={() => {*/}
      {/*    console.log('more');*/}
      {/*  }}*/}
      {/*/ >*/}
    </Container>
  );
};

export default PoliciesControl;

const Container = styled.div`
  display: flex;
  gap: 12px;
`;
