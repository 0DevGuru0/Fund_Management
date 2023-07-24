import { PolicyType, VoucherStatus } from '.prisma/backend-client';

export const journalId = '123';
export const emptyPolicyMembershipJournalId = '234';
export const getPoliciesTestData = {
  policies: [
    {
      type: PolicyType.VOUCHER,
      title: 'abc',
      terms: 'abc',
      fundId: 'abc',
      note: 'abc',
      createdBy: 'abc',
    },
    {
      type: PolicyType.INVOICE,
      title: 'abc',
      terms: 'abc',
      fundId: 'abc',
      note: 'abc',
      createdBy: 'abc',
      isActive: false,
    },
    {
      type: PolicyType.VOUCHER,
      title: 'bcd',
      terms: 'abc',
      fundId: 'abc',
      note: 'abc',
      createdBy: 'abc',
    },
    {
      type: PolicyType.VOUCHER,
      title: 'def',
      terms: 'abc',
      fundId: 'abc',
      note: 'abc',
      createdBy: 'abc',
    },
    {
      type: PolicyType.INVOICE,
      title: 'efg',
      fundId: 'abc',
      terms: 'abc',
      note: 'abc',
      createdBy: 'abc',
    },
  ],
  journalGroups: [
    {
      title: 'abc',
      fundId: 'abc',
      publisherId: 'abc',
      createdBy: 'abc',
      journalsCount: 0,
    },
    {
      title: 'abc',
      fundId: 'abc',
      publisherId: 'abc',
      createdBy: 'abc',
      journalsCount: 0,
    },
    {
      title: 'abc',
      fundId: 'abc',
      publisherId: 'abc',
      createdBy: 'abc',
      journalsCount: 0,
    },
    {
      title: 'abc',
      fundId: 'abc',
      publisherId: 'abc',
      createdBy: 'abc',
      journalsCount: 0,
    },
  ],
  journalGroupsOfPolicy: [
    {
      policyId: 0,
      journalGroupId: 0,
      assignedBy: 'abc',
    },
    {
      policyId: 3,
      journalGroupId: 0,
      assignedBy: 'abc',
    },
    {
      policyId: 1,
      journalGroupId: 1,
      assignedBy: 'abc',
    },
    {
      policyId: 2,
      journalGroupId: 1,
      assignedBy: 'abc',
    },
    {
      policyId: 3,
      journalGroupId: 1,
      assignedBy: 'abc',
    },
  ],
  journalsOfJournalGroup: [
    {
      journalId,
      batchId: '123e4567-e89b-12d3-a456-426614174000',
      assignedBy: 'abc',
      journalGroupId: 0,
    },
    {
      journalId,
      batchId: '123e4567-e89b-12d3-a456-426614174000',
      assignedBy: 'abc',
      journalGroupId: 1,
    },
    {
      journalId: emptyPolicyMembershipJournalId,
      batchId: '123e4567-e89b-12d3-a456-426614174000',
      assignedBy: 'abc',
      journalGroupId: 2,
    },
    {
      journalId: emptyPolicyMembershipJournalId,
      batchId: '123e4567-e89b-12d3-a456-426614174000',
      assignedBy: 'abc',
      journalGroupId: 3,
    },
  ],
  vouchers: [
    {
      status: VoucherStatus.AVAILABLE,
      code: 'abc',
      policyId: 2,
      publisherId: 'bcd',
      batchId: '123e4567-e89b-12d3-a456-426614174000',
    },
    {
      status: VoucherStatus.RESERVED,
      code: 'bcd',
      policyId: 0,
      publisherId: 'cde',
      batchId: '123e4567-e89b-12d3-a456-426614174000',
    },
  ],
};
