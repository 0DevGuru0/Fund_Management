import esb from 'elastic-builder';
import { isNil } from 'lodash';

import { IFilter } from '$application/components/organisms/tables/Table/Filter/filterTypes';

export interface FilterQueryVariablesProps {
  limit: number;
  offset: number;
  query: Record<string, any>;
  sort?: Record<string, Record<string, string>>[];
}

export const filterQueryBuilder = (
  limit: number,
  offset: number,
  sortOption: string,
  filterOptions: IFilter,
): FilterQueryVariablesProps => {
  const query = esb.boolQuery().must(esb.matchQuery('schema', 'Journal'));
  const sort: Record<string, Record<string, string>>[] = [];

  // Search Phrase
  if (filterOptions.searchPhrase) {
    query.must(
      esb.multiMatchQuery(
        ['title^2', 'title.suggestion', 'Journal.printISSN', 'Journal.onlineISSN'],
        filterOptions.searchPhrase,
      ),
    );
  }

  // Checkboxes
  // TODO: Currently, we do not have states Active/Suspended
  // if (filterOptions.states) {}

  // SelectBoxes
  if (filterOptions.license) {
    filterOptions.license.forEach((license) => {
      query.filter(esb.matchPhraseQuery('Journal.licenseType.keyword', license));
    });
  }
  if (filterOptions.subject) {
    filterOptions.subject.forEach((subject) => {
      query.filter(esb.matchQuery('Journal.subjects', subject));
    });
  }
  if (filterOptions.publisher) {
    const publishers: string[] = (filterOptions.publisher as any[]).map((publisher) => {
      return publisher.id;
    });
    query.filter(esb.termsQuery('Journal.publisher', publishers));
  }
  if (filterOptions.language) {
    filterOptions.language.map((language) => {
      query.filter(esb.matchQuery('Journal.languages', language));
    });
  }
  if (filterOptions.maxApc) {
    // TODO: we do not have any APC and Currency in database - It will be handled in IW-420
    // TODO: we should check the MAX APC filter's functionality after IW-420
    // if ((filterOptions.maxApc as any)[0].value) {
    //   const currency = (filterOptions.maxApc as any)[0].id;
    //   const price = (filterOptions.maxApc as any)[0].value;
    // }
  }
  if (filterOptions.sjrQuartile) {
    if (!isNil(filterOptions.sjrQuartile)) {
      query
        .filter(esb.existsQuery('Journal.sjrQuartile'))
        .filter(
          esb.termsQuery(
            'Journal.sjrQuartile.keyword',
            filterOptions.sjrQuartile as string[],
          ),
        );
    }
  }
  if (filterOptions.jcrQuartile) {
    if (!isNil(filterOptions.jcrQuartile)) {
      query
        .filter(esb.existsQuery('Journal.jcrQuartile'))
        .filter(
          esb.termsQuery(
            'Journal.jcrQuartile.keyword',
            filterOptions.jcrQuartile as string[],
          ),
        );
    }
  }

  // Sort
  // TODO: We need to wait for Repository to change ignore_above command in keyword search
  if (sortOption === 'Title Z-A') {
    sort.push({ 'title.keyword': { order: 'desc' } });
  } else {
    sort.push({ 'title.keyword': { order: 'asc' } });
  }

  return { limit, offset, query, sort };
};
