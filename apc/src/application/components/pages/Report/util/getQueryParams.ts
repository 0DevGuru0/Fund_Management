import { ParsedUrlQuery } from 'querystring';

import generateQueryString from '$application/lib/generateQueryString';

export interface ReportParams {
  fundIds?: string;
  fundTitles?: string;
  publisherIds?: string;
  publisherTitles?: string;
  affiliationIds?: string;
  affiliationTitles?: string;
  journalIds?: string;
  journalTitles?: string;
  policyIds?: string;
  policyTitles?: string;
  state?: string;
  startDate?: string;
  endDate?: string;
  type?: string;
}

export const getQueryParams = (query: ParsedUrlQuery): ReportParams => {
  return {
    fundIds: generateQueryString(query.funderIds),
    fundTitles: generateQueryString(query.funderTitles),
    publisherIds: generateQueryString(query.publisherIds),
    publisherTitles: generateQueryString(query.publisherTitles),
    affiliationIds: generateQueryString(query.affiliationIds),
    affiliationTitles: generateQueryString(query.affiliationTitles),
    journalIds: generateQueryString(query.subjectIds),
    journalTitles: generateQueryString(query.subjectTitles),
    policyIds: generateQueryString(query.policyIds),
    policyTitles: generateQueryString(query.policyTitles),
    state: generateQueryString(query.status),
    startDate: generateQueryString(query.startDate),
    endDate: generateQueryString(query.endDate),
    type: generateQueryString(query.type),
  };
};
