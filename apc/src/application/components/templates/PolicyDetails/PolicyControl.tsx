import React, { FC, useState } from 'react';

import { useQueryClient } from 'react-query';
import styled from 'styled-components';

// import MoreSVG from '$application/assets/icons/more-horizontal.svg';
import { Button } from '$application/components/atoms/buttons/Button';
// import { IconButton } from '$application/components/atoms/buttons/IconButton';
import { ImportPolicyVouchersWizard } from '$application/components/organisms/wizards/ImportPolicyVouchersWizard';
import { getGetVouchersOfPolicyQueryKey } from '$application/lib/generated/apcApi';
import { GetPolicies200PoliciesItem } from '$application/lib/generated/apcApi.schemas';

interface PolicyControlProps {
  policy?: GetPolicies200PoliciesItem;
}

export const PolicyControl: FC<PolicyControlProps> = ({ policy }) => {
  const [voucherWizardOpen, setVoucherWizardOpen] = useState(false);
  const queryClient = useQueryClient();

  if (policy?.type !== 'VOUCHER') {
    return null;
  }

  return (
    <>
      <Container>
        <Button
          color="primary"
          leftIcon="upload-cloud"
          customSize="lg"
          title="Import"
          variant="contained"
          onClick={() => {
            setVoucherWizardOpen(true);
          }}
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
      <ImportPolicyVouchersWizard
        policy={policy}
        open={voucherWizardOpen}
        onClose={() => setVoucherWizardOpen(false)}
        onDone={() => {
          if (policy) {
            queryClient.refetchQueries(getGetVouchersOfPolicyQueryKey(policy.id));
          }
        }}
      />
    </>
  );
};

export default PolicyControl;

const Container = styled.div`
  display: flex;
  gap: 12px;
`;
