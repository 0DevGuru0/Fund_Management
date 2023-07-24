import { GetOrganizationsType } from '$application/lib/generated/apcApi.schemas';
import { getBackendPrisma } from '$data/prisma';
import { BadRequestError, NotFoundError } from '$service/errors';
import { getOrganizations } from '$service/organizations/getOrganizations';

import { Policy, PolicyType, Prisma } from '.prisma/backend-client';

interface Parameters {
  type: PolicyType;
  title: string;
  fundId: string;
  terms: string;
  isActive?: boolean;
  note: string;
  createdBy: string;
  publisherId?: string | null;
  journalGroupIds?: string[];
}

export const createPolicy = async (
  parameters: Parameters,
  authorization: string,
): Promise<Policy> => {
  const { fundId, createdBy, publisherId } = parameters;
  const prisma = await getBackendPrisma();

  const organizationChecks = [
    getOrganizations(
      {
        limit: 1,
        skip: 0,
        ids: [fundId],
        type: GetOrganizationsType.Fund,
      },
      authorization,
    ),
  ];
  if (publisherId) {
    organizationChecks.push(
      getOrganizations(
        {
          limit: 1,
          skip: 0,
          ids: [publisherId],
          type: GetOrganizationsType.Publisher,
        },
        authorization,
      ),
    );
  }
  const [funds, publishers] = await Promise.all(organizationChecks);

  const errors: string[] = [];
  if (funds.length === 0) {
    errors.push('such fund does not exist in our repository');
  }
  if (publishers && publishers.length === 0) {
    errors.push('such publisher does not exist in our repository');
  }
  if (errors.length > 0) {
    throw new NotFoundError(undefined, { extensions: errors });
  }

  const { journalGroupIds, ...policy } = parameters;
  const policyCreationData: Prisma.PolicyCreateInput = { ...policy };

  if (journalGroupIds && journalGroupIds.length > 0) {
    const journalGroups = await prisma.journalGroup.findMany({
      where: {
        OR: journalGroupIds.map((id) => ({ id })),
        publisherId: publisherId ?? undefined,
      },
    });
    if (journalGroups.length !== journalGroupIds.length) {
      throw new BadRequestError(
        'some of the provided journal groups does not have a publisherId equal to provided publisherId',
      );
    }
    policyCreationData.journalGroups = {
      createMany: {
        data: journalGroupIds.map((id) => ({
          journalGroupId: id,
          assignedBy: createdBy,
        })),
      },
    };
  }

  return prisma.policy.create({
    data: policyCreationData,
  });
};
