import { useEffect, useState } from 'react';

import esb from 'elastic-builder';
import { useUpdateAtom } from 'jotai/utils';
import { isEmpty } from 'lodash';

import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { useGetPublishersNameQuery } from '$application/lib/generated/repoGqlTypes';

import { formDataAtom } from '../store';

import itemsMapper from './itemsMapper';

const limit = 10;

const publisherInitQuery = (publishers?: string[]): esb.BoolQuery => {
  const result = esb
    .boolQuery()
    .must(esb.matchQuery('schema.keyword', 'Organization'))
    .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));
  if (publishers) {
    result.must(esb.termsQuery('_id', publishers));
  }
  return result;
};

const publisherQueryByTerm = (newTerm: string, publishers?: string[]): esb.BoolQuery => {
  const result = esb
    .boolQuery()
    .must(esb.multiMatchQuery(['title^2', 'title.suggestion'], newTerm))
    .filter(esb.termQuery('schema.keyword', 'Organization'))
    .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));
  if (publishers) {
    result.must(esb.termsQuery('_id', publishers));
  }
  return result;
};

export const usePublisher = () => {
  const [offset, setOffset] = useState(0);
  const setFormData = useUpdateAtom(formDataAtom);

  const { roles } = useUserInfo();
  let rolePublishers: string[] | undefined;
  if (!roles.SystemAdmin && roles.PublisherAdmin) {
    rolePublishers = [...(roles.PublisherAdmin || [])];
    if (rolePublishers.length > 0) {
      rolePublishers.splice(0, 1);
    }
  }

  const [publishersElasticQuery, setPublishersElasticQuery] = useState<esb.BoolQuery>(
    publisherInitQuery(rolePublishers),
  );

  const [publishers] = useGetPublishersNameQuery({
    pause: isEmpty(publishersElasticQuery),
    variables: {
      limit,
      offset,
      query: publishersElasticQuery,
    },
  });

  const onFilterChange = (newTerm: string) => {
    let query;
    if (newTerm) {
      query = publisherQueryByTerm(newTerm, rolePublishers);
    }
    setPublishersElasticQuery(query ?? publisherInitQuery(rolePublishers));
  };

  useEffect(() => {
    if (rolePublishers) {
      setFormData((a) => {
        a.publisher = itemsMapper(publishers.data?.search.items);
      });
    }
  }, [publishers]);

  return {
    onFilterChange,
    items: itemsMapper(publishers.data?.search.items),
    onLoadMore: () => setOffset(offset + limit),
  };
};
