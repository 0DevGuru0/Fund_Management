import { StoryFC } from '$application/components/StoryFC';

import Policies, { PoliciesProps } from './Policies';

export default {
  title: 'Pages / Policies',
  component: Policies,
  parameters: {
    background: { noPadding: true },
    zeplinLink:
      'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60dc5e5c36c3f009f9b6ddab',
  },
};

export const PoliciesPage: StoryFC<PoliciesProps> = Policies;

PoliciesPage.args = {
  policiesData: {
    queryKey: ['/policies', { fields: 'journalGroups', limit: '10', skip: '0' }],
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
              policyId: 'f92746ec-7633-4f87-a72e-7bbbf8552c85',
              journalGroupId: '6c9a5469-d421-4ca5-923a-6f44862a29af',
              assignedBy: 'sehsanmgmailcom',
              assignedAt: '2021-09-13T08:41:04.088Z',
              // @ts-ignore
              journalGroup: {
                id: '6c9a5469-d421-4ca5-923a-6f44862a29af',
                title: 'Universidad Pontificia Comillas - STDF (Voucher)',
                fundId: '6119d1536a1eba00075b16a2',
                publisherId: '609fc4ee18232d00065826e3',
                journalsCount: 4,
                createdBy: 'sehsanmgmailcom',
                createdAt: '2021-09-13T08:39:20.357Z',
              },
            },
          ],
        },
        {
          id: '790e8ce7-f1a6-4288-87a3-9116a71c9ec4',
          type: 'VOUCHER',
          title: 'Elsevier Journals 20% Discount (Vouchers) - STDF',
          fundId: '6119d1536a1eba00075b16a2',
          terms: '20% discount',
          isActive: true,
          note: 'This is a good policy',
          createdBy: 'sehsanmgmailcom',
          createdAt: '2021-09-13T08:28:56.715Z',
          publisherId: '609fc51f18232d0006582c48',
          journalGroups: [
            {
              policyId: '790e8ce7-f1a6-4288-87a3-9116a71c9ec4',
              journalGroupId: 'f3084ab3-6a21-4e90-948a-d23e80349cdf',
              assignedBy: 'sehsanmgmailcom',
              assignedAt: '2021-09-13T08:28:56.715Z',
              // @ts-ignore
              journalGroup: {
                id: 'f3084ab3-6a21-4e90-948a-d23e80349cdf',
                title: 'Elsevier - STDF (Voucher)',
                fundId: '6119d1536a1eba00075b16a2',
                publisherId: '609fc51f18232d0006582c48',
                journalsCount: 113,
                createdBy: 'sehsanmgmailcom',
                createdAt: '2021-09-13T08:16:32.325Z',
              },
            },
          ],
        },
        {
          id: '909f4a3e-2e25-4c0d-9343-5382376653a4',
          type: 'VOUCHER',
          title: 'Elsevier Journals 20% Discount (Vouchers) - STDF',
          fundId: '6119d1536a1eba00075b16a2',
          terms: '20% discount',
          isActive: true,
          note: 'This is a good policy',
          createdBy: 'sehsanmgmailcom',
          createdAt: '2021-09-13T08:18:36.935Z',
          publisherId: '609fc51f18232d0006582c48',
          journalGroups: [
            {
              policyId: '909f4a3e-2e25-4c0d-9343-5382376653a4',
              journalGroupId: 'f3084ab3-6a21-4e90-948a-d23e80349cdf',
              assignedBy: 'sehsanmgmailcom',
              assignedAt: '2021-09-13T08:18:36.935Z',
              // @ts-ignore
              journalGroup: {
                id: 'f3084ab3-6a21-4e90-948a-d23e80349cdf',
                title: 'Elsevier - STDF (Voucher)',
                fundId: '6119d1536a1eba00075b16a2',
                publisherId: '609fc51f18232d0006582c48',
                journalsCount: 113,
                createdBy: 'sehsanmgmailcom',
                createdAt: '2021-09-13T08:16:32.325Z',
              },
            },
          ],
        },
      ],
      activeCount: 4,
      inactiveCount: 0,
    },
    error: null,
    isFetching: false,
  },
};
