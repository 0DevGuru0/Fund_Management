import esb from 'elastic-builder';

export const fundQueryByTerm = (newTerm: string, funds?: string[]): esb.BoolQuery => {
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
