import { graphql } from 'msw';

import { StoryFC } from '$application/components/StoryFC';

import PolicyDetails, { PolicyDetailsProps } from './PolicyDetails';

export default {
  title: 'Pages / Policy Details',
  component: PolicyDetails,
  parameters: {
    background: { noPadding: true },
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5e8f44c2b90912e46129',
    msw: [
      graphql.query('getTitleByIds', (_req, res, ctx) =>
        res(
          ctx.delay(200),
          ctx.data({
            data: {
              getItems: [
                {
                  id: '6119d1536a1eba00075b16a2',
                  title: 'Test Fund',
                  __typename: 'Organization',
                },
                {
                  id: '609fc4ee18232d00065826e3',
                  title: 'Universidad Pontificia Comillas',
                  __typename: 'Organization',
                },
              ],
            },
          }),
        ),
      ),
    ],
  },
};

export const Management: StoryFC<PolicyDetailsProps> = PolicyDetails;

Management.args = {
  vouchersData: {
    isFetching: false,
    data: {
      vouchers: [
        {
          id: '31aad613-c4da-4c00-9f3b-12232a75e68f',
          status: 'RESERVED',
          code: 'CCC11',
          policyId: 'f92746ec-7633-4f87-a72e-7bbbf8552c85',
          publisherId: '609fc4ee18232d00065826e3',
          usableAfter: null,
          expiresAt: null,
          allocatedAt: null,
          lastReservedAt: null,
          batchId: 'daf8c68b-6257-444e-9739-f1000d163602',
          note: 'veniam Excepteur proident Duis',
          createdAt: '2021-09-13T08:41:34.349Z',
          fundApplicationId: 2,
        },
      ],
      counts: { AVAILABLE: 0, RESERVED: 1, ALLOCATED: 0, SUSPENDED: 0 },
    },
  },
  policyData: {
    isLoading: false,
    data: {
      policies: [
        {
          id: 'f92746ec-7633-4f87-a72e-7bbbf8552c85',
          type: 'VOUCHER',
          title: 'Journals 20% Discount (Vouchers) - STDF',
          fundId: '6119d1536a1eba00075b16a2',
          terms: '20% discount',
          isActive: true,
          note: 'This is a good policy',
          createdBy: 'sehsanmgmailcom',
          createdAt: '2021-09-13T08:41:04.088Z',
          publisherId: '609fc4ee18232d00065826e3',
          journalGroups: [
            {
              // @ts-ignore
              journalGroup: {
                createdAt: '2021-09-13T08:39:20.357Z',
                createdBy: 'sehsanmgmailcom',
                fundId: '6119d1536a1eba00075b16a2',
                id: '6c9a5469-d421-4ca5-923a-6f44862a29af',
                journalsCount: 4,
                publisherId: '609fc4ee18232d00065826e3',
                title: 'Universidad Pontificia Comillas - STDF (Voucher)',
              },
              policyId: 'f92746ec-7633-4f87-a72e-7bbbf8552c85',
              journalGroupId: '6c9a5469-d421-4ca5-923a-6f44862a29af',
              assignedBy: 'sehsanmgmailcom',
              assignedAt: '2021-09-13T08:41:04.088Z',
            },
          ],
        },
      ],
      activeCount: 1,
      inactiveCount: 0,
    },
  },
};
