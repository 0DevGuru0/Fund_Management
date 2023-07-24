import { JSONSchemaType } from '$service/validator/ajvTypes';

export interface GetFundApplicationsQuery {
  policyType: string;
  processInstanceIds: string;
  fundApplicationIds: string;
  fundIds: string;
  publisherIds: string;
  affiliationIds: string;
  journalIds: string;
  states: string;
  startDate: string;
  endDate: string;
  sortBy: string;
  fields: string;
  limit: string;
  skip: string;
  [key: string]: string | string[];
}

export type GetFundApplicationsReportQuery = Omit<
  GetFundApplicationsQuery,
  'limit' | 'skip' | 'fields'
>;

const getFundApplicationsReportQueryProperties = {
  policyType: {
    type: 'string',
    openApiIn: 'query',
  },
  processInstanceIds: {
    type: 'string',
    openApiIn: 'query',
  },
  fundApplicationIds: {
    type: 'string',
    openApiIn: 'query',
  },
  fundIds: {
    type: 'string',
    openApiIn: 'query',
  },
  publisherIds: {
    type: 'string',
    openApiIn: 'query',
  },
  affiliationIds: {
    type: 'string',
    openApiIn: 'query',
  },
  journalIds: {
    type: 'string',
    openApiIn: 'query',
  },
  states: {
    type: 'string',
    openApiIn: 'query',
  },
  startDate: {
    type: 'string',
    openApiIn: 'query',
  },
  endDate: {
    type: 'string',
    openApiIn: 'query',
  },
  sortBy: {
    type: 'string',
    openApiIn: 'query',
  },
} as const;
export const getFundApplicationsReportQueryDto: JSONSchemaType<
  GetFundApplicationsReportQuery,
  false,
  true
> = {
  type: 'object',
  properties: getFundApplicationsReportQueryProperties,
};

const getFundApplicationsQueryProperties = {
  ...getFundApplicationsReportQueryProperties,
  limit: { type: 'string', format: 'int32', openApiIn: 'query' },
  skip: { type: 'string', format: 'int32', openApiIn: 'query' },
  fields: { type: 'string', openApiIn: 'query' },
} as const;
export const getFundApplicationsQueryDto: JSONSchemaType<
  GetFundApplicationsQuery,
  false,
  true
> = {
  type: 'object',
  properties: getFundApplicationsQueryProperties,
};
