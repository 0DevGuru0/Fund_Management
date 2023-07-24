import esb from 'elastic-builder';

export const publisherQueryByTerm = (term: string): esb.BoolQuery =>
  esb
    .boolQuery()
    .must(esb.matchQuery('title', term))
    .filter(esb.termQuery('schema.keyword', 'Organization'))
    .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));

export const fundQueryByTerm = (term: string): esb.BoolQuery =>
  esb
    .boolQuery()
    .must(esb.matchQuery('title', term))
    .filter(esb.termQuery('schema.keyword', 'Organization'))
    .filter(esb.termQuery('Organization.type.keyword', 'Fund'));
