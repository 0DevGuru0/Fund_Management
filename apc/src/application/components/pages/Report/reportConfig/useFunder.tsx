import { useEffect, useState } from 'react';

import esb from 'elastic-builder';
import { useUpdateAtom } from 'jotai/utils';
import { isEmpty } from 'lodash';

import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { useGetFundersQuery } from '$application/lib/generated/repoGqlTypes';

import { formDataAtom } from '../store';

import itemsMapper from './itemsMapper';

const limit = 10;

const fundInitQuery = (funds?: string[]): esb.BoolQuery => {
  const result = esb
    .boolQuery()
    .must(esb.matchQuery('schema.keyword', 'Organization'))
    .filter(esb.termQuery('Organization.type.keyword', 'Fund'));
  if (funds) {
    result.must(esb.termsQuery('_id', funds));
  }
  return result;
};

const fundQueryByTerm = (newTerm: string, funds?: string[]): esb.BoolQuery => {
  const result = esb
    .boolQuery()
    .must(esb.multiMatchQuery(['title^2', 'title.suggestion'], newTerm))
    .filter(esb.termQuery('schema.keyword', 'Organization'))
    .filter(esb.termQuery('Organization.type.keyword', 'Fund'));
  if (funds) {
    result.must(esb.termsQuery('_id', funds));
  }
  return result;
};

export const useFunder = () => {
  const setFormData = useUpdateAtom(formDataAtom);
  const { roles } = useUserInfo();
  let roleFunds: string[] | undefined;
  if (!roles.SystemAdmin && (roles.FundManager || roles.FundFinancialManager)) {
    roleFunds = [...(roles.FundFinancialManager || []), ...(roles.FundManager || [])];
  }
  const [offset, setOffset] = useState(0);

  const [fundsElasticQuery, setFundsElasticQuery] = useState<esb.BoolQuery>(
    fundInitQuery(roleFunds),
  );

  const [funds] = useGetFundersQuery({
    pause: isEmpty(fundsElasticQuery),
    variables: {
      limit,
      offset,
      query: fundsElasticQuery,
    },
  });

  useEffect(() => {
    if (roleFunds) {
      setFormData((a) => {
        a.funder = itemsMapper(funds.data?.search.items);
      });
    }
  }, [funds]);

  const onFundFilterTermChanged = (newTerm: string) => {
    let query = fundInitQuery(roleFunds);
    if (newTerm) {
      query = fundQueryByTerm(newTerm, roleFunds);
    }
    setFundsElasticQuery(query);
  };

  return {
    items: itemsMapper(funds.data?.search.items),
    onLoadMore: () => setOffset(offset + limit),
    onFilterChange: onFundFilterTermChanged,
  };
};
