import { useEffect } from 'react';

import { useGetPolicies } from '$application/lib/generated/apcApi';

import itemsMapper from './itemsMapper';

export const usePolicy = () => {
  const policyData = useGetPolicies(
    {
      fields: 'id, title',
    },
    { query: { enabled: false } },
  );

  useEffect(() => {
    policyData.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    items: policyData.isLoading ? [] : itemsMapper(policyData.data?.policies),
  };
};
