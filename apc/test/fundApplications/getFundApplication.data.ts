import { PolicyType } from '.prisma/backend-client';

export const getFundApplicationsTestData = {
  policies: [
    {
      type: PolicyType.INVOICE,
      title: 'abc',
      fundId: 'abc',
      terms: 'abc',
      note: 'abc',
      createdBy: 'abc',
    },
  ],
  fundApplications: [
    {
      articleTitle: 'abc',
      articleFile: {
        storage: 'base64',
        name: 'fbc404bb-6a71-4f82-909b-772c9176bd46.pdf',
        url: 'data:application/pdf;base64,MTIzNA==',
        size: 4,
        type: 'application/pdf',
        originalName: 'empty.pdf',
      },
      userId: 'test',
      policyId: 0,
      processInstanceId: '123e4567-e89b-12d3-a456-426614174000',
      fundId: 'abc',
      publisherId: 'abc',
      journalId: 'abc',
      affiliationId: 'abc',
      variables: {},
      state: 'abc',
      createdAt: '2021-10-13T08:39:14.600Z',
    },
    {
      articleTitle: 'abc',
      articleFile: {
        storage: 'base64',
        name: 'fbc404bb-6a71-4f82-909b-772c9176bd46.pdf',
        url: 'data:application/pdf;base64,MTIzNA==',
        size: 4,
        type: 'application/pdf',
        originalName: 'empty.pdf',
      },
      userId: 'test',
      policyId: 0,
      processInstanceId: '223e4567-e89b-12d3-a456-426614174000',
      fundId: 'xyz',
      publisherId: 'xyz',
      journalId: 'xyz',
      affiliationId: 'xyz',
      variables: {},
      state: 'xyz',
      createdAt: '2021-10-15T08:39:14.600Z',
    },
  ],
};
