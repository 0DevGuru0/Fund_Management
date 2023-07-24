import React from 'react';

import { NextPage } from 'next';

import PolicyDetailsPage from './PolicyDetails';

export interface PageProps {
  policyId?: string;
}
export const FundManagerPolicyDetails: NextPage<PageProps> = ({ policyId }) => {
  return <PolicyDetailsPage policyId={policyId} type={'management'} />;
};

export default FundManagerPolicyDetails;
