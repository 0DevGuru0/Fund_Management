import { useState, useEffect } from 'react';

import esb from 'elastic-builder';
import { isEmpty, uniqBy } from 'lodash';

import { Item } from '$application/components/molecules/etc/Menu';
import { useGetAffiliationsNameQuery } from '$application/lib/generated/repoGqlTypes';

import itemsMapper from './itemsMapper';

const limit = 10;

const initQuery = esb
  .boolQuery()
  .must(esb.matchQuery('schema.keyword', 'Organization'))
  .filter(esb.termQuery('Organization.type.keyword', 'Institute'));

const queryByTerm = (newTerm: string): esb.BoolQuery =>
  esb
    .boolQuery()
    .must(esb.matchQuery('schema.keyword', 'Organization'))
    .filter(esb.termQuery('Organization.type.keyword', 'Institute'))
    .must(esb.multiMatchQuery(['title^2', 'title.suggestion'], newTerm));

export const useAffiliation = () => {
  const [offset, setOffset] = useState<number>(0);
  const [elasticQuery, setElasticQuery] = useState<esb.BoolQuery>(initQuery);
  const [items, setItems] = useState<Item[]>([]);

  const [affiliations] = useGetAffiliationsNameQuery({
    pause: isEmpty(elasticQuery),
    variables: {
      limit,
      offset,
      query: elasticQuery,
    },
  });

  const onFilterChange = (newTerm: string) => {
    setOffset(0);
    setItems([]);
    if (!isEmpty(newTerm.trim())) {
      setElasticQuery(queryByTerm(newTerm));
    } else {
      setElasticQuery(initQuery);
    }
  };

  useEffect(() => {
    const tempItems = [...items, ...itemsMapper(affiliations.data?.search.items)];
    setItems(uniqBy(tempItems, (item) => item.id));
  }, [affiliations]);

  return {
    onFilterChange,
    onLoadMore: () => setOffset(offset + limit),
    items,
  };
};
