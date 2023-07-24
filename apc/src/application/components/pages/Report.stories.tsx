import { rest, graphql } from 'msw';

import { StoryFC } from '$application/components/StoryFC';
import { createServerAddress } from '$application/utils/createServerAddress';

import Report from './Report';

export const Default: StoryFC = Report;

export default {
  title: 'Pages / Report',
  component: Report,
  parameters: {
    msw: [
      rest.get(createServerAddress('policies'), (req, res, ctx) =>
        res(
          ctx.delay(500),
          ctx.json({
            activeCount: -37089170,
            inactiveCount: -11442386,
            policies: [
              {
                id: 'exercitation',
                type: 'INVOICE',
                title: 'labore',
                fundId: 'cillum in id',
                terms: 'officia',
                isActive: false,
                note: 'dolor pariatur sit',
                createdBy: 'ad ut',
                journalGroups: [
                  {
                    journalGroupId: 'reprehenderit mollit dolor dolor ut',
                    policyId: 'aliqua sed',
                    assignedBy: 'occaecat veniam',
                  },
                ],
                publisherId: 'dolor sit non laboris labore',
                fund: {
                  mollit21_: -65589397,
                  amet_0: 20491475.48497601,
                  sed750: true,
                  fugiatf: 81615766,
                },
              },
            ],
          }),
        ),
      ),
      graphql.query('getSchemasName', (_req, res, ctx) =>
        res(
          ctx.delay(1000),
          ctx.data({
            schemas: [
              {
                name: 'Organization',
                label: { default: 'Organization' },
                description: 'Organization',
                _id: '6083fade55b25f0006e3d887',
                isCollection: false,
              },
              {
                name: 'Journal',
                label: { default: 'Journal' },
                description: 'Journal',
                _id: '6083faf455b25f0006e3d888',
                isCollection: false,
              },
              {
                data: {
                  tree: {
                    nodes: [
                      {
                        id: '60fbbcac0023940006e0d9cc',
                        title: 'Academies & Learned Societies Publications',
                        children: null,
                      },
                      {
                        id: '60fbbcac0023940006e0d9cd',
                        title: 'History of Scholarship & Learning',
                        children: null,
                      },
                      {
                        id: '60fbbcac0023940006e0d9ce',
                        title: 'Information Resources (General)',
                        children: [
                          '60fbbcac0023940006e0d9cc',
                          '60fbbcac0023940006e0d9cd',
                        ],
                      },
                    ],
                  },
                  rootNodesId: [
                    '60fbbcac0023940006e0d9e0',
                    '60fbbcac0023940006e0da00',
                    '60fbbcac0023940006e0da29',
                    '60fbbcac0023940006e0da5a',
                    '60fbbcac0023940006e0daa2',
                    '60fbbcac0023940006e0dade',
                    '60fbbcac0023940006e0db54',
                    '60fbbcac0023940006e0dbcf',
                    '60fbbcac0023940006e0dc5f',
                  ],
                },
              },
            ],
          }),
        ),
      ),
    ],
    background: { noPadding: true },
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/613886ec90c626b8f635d909',
  },
};
