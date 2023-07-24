import dayjs from 'dayjs';
import { keyBy, merge } from 'lodash';
import XLSX from 'xlsx';

import { getGraphqlClient } from '$data/graphql/graphQLClient';
import {
  changeToRealCurrencyString,
  showCurrency,
} from '$service/currencies/changeToRealCurrencyString';
import { createExcelFromData } from '$service/excel/createExcelFromData';
import { streamTemporaryExcelToS3 } from '$service/file/streamTemporaryExcelToS3';
import { getSdk } from '$service/generated/repoGqlTypes';
import { TitleOrganization } from '$service/groups/getTokenRolesSplitted';
import { getAllUsers } from '$service/user/getAllUsers';

import { getFundApplications } from './getFundApplication';
import { GetFundApplicationsReportQuery } from './getFundApplicationsDto';

interface StringifiedFundApplication {
  [key: string]: string;
}

const client = getGraphqlClient();
const { getTitleByIds } = getSdk(client);

const getFromRepository = async (ids: string[]): Promise<any> => {
  const totalItemsCount = ids.length;
  const limit = 100;
  let allItems = [];
  for (let fetchCount = 0; fetchCount < totalItemsCount; fetchCount += limit) {
    const selectedIds = ids.slice(fetchCount, limit + fetchCount);
    const items = await getTitleByIds({
      ids: Array.from(selectedIds),
    });
    allItems = merge(allItems, items.getItems);
  }
  return allItems;
};

export const generateFundApplicationReportUrl = async (
  fundApplicationsFilter: GetFundApplicationsReportQuery,
  roles: TitleOrganization,
): Promise<string> => {
  const policyType = fundApplicationsFilter.policyType;
  const fieldsArray = ['policy'];
  if (policyType) {
    switch (policyType) {
      case 'VOUCHER':
        fieldsArray.push('voucher');
        break;
      case 'INVOICE':
        fieldsArray.push('budgetAllocation');
        break;
    }
  }
  let stringifiedFundApplications: StringifiedFundApplication[] = [];
  const { fundApplications } = await getFundApplications({
    ...fundApplicationsFilter,
    fieldsArray,
    roles,
  });
  if (fundApplications.length > 0) {
    const fundIds: Set<string> = new Set();
    const publisherIds: Set<string> = new Set();
    const journalIds: Set<string> = new Set();
    const usernames: Set<string> = new Set();
    fundApplications.forEach((fundItem) => {
      fundIds.add(fundItem.fundId);
      publisherIds.add(fundItem.publisherId);
      journalIds.add(fundItem.journalId);
      usernames.add(fundItem.userId);
    });

    const [users, funds, publishers, journals] = await Promise.all([
      getAllUsers(Array.from(usernames)),
      getFromRepository(Array.from(fundIds)),
      getFromRepository(Array.from(publisherIds)),
      getFromRepository(Array.from(journalIds)),
    ]);

    const usersMap = keyBy(users, 'username');
    const fundsMap = keyBy(funds, 'id');
    const journalsMap = keyBy(journals, 'id');
    const publishersMap = keyBy(publishers, 'id');

    stringifiedFundApplications = fundApplications.map((fundApplication) => {
      const user = usersMap[fundApplication.userId];
      const publishCurrency = showCurrency(fundApplication.currency ?? '');
      const budgetCurrency = showCurrency(
        fundApplication.budgetAllocation?.currency ?? '',
      );
      const returnVal = {
        ID: fundApplication.id.toString(),
        'Article Title': fundApplication.articleTitle,
        User: `${user.firstName} ${user.lastName} (${user.username})`,
        Policy: `${fundApplication.policy?.title} (${fundApplication.policy?.type})`,
        Journal: journalsMap[fundApplication.journalId].title,
        Funder: fundsMap[fundApplication.fundId].title,
        Publisher: publishersMap[fundApplication.publisherId].title,
        'Publish Price': fundApplication.publishPrice,
        'Publish Price Currency': publishCurrency ?? '',
        State: fundApplication.state,
        'Created At': dayjs(fundApplication.createdAt).format('DD MMM YYYY'),
      };
      switch (policyType) {
        case 'VOUCHER':
          returnVal['Voucher Code'] = fundApplication.voucher?.code;
          break;
        case 'INVOICE':
          returnVal['Budget Allocation Status'] =
            fundApplication.budgetAllocation?.status;
          returnVal['Budget Currency'] = budgetCurrency;
          returnVal['Budget Allocation Original Amount'] = changeToRealCurrencyString(
            fundApplication.budgetAllocation?.originalAmount
              ? BigInt(fundApplication.budgetAllocation?.originalAmount)
              : BigInt(0),
          );
          returnVal[
            'Budget Allocation Original Accepted Amount'
          ] = changeToRealCurrencyString(
            fundApplication.budgetAllocation?.acceptedAmount
              ? BigInt(fundApplication.budgetAllocation?.acceptedAmount)
              : BigInt(0),
          );
          break;
      }
      return returnVal;
    });
  }

  const workbook = createExcelFromData<StringifiedFundApplication>(
    stringifiedFundApplications,
  );

  const stream = XLSX.stream.to_csv(workbook.Sheets[workbook.SheetNames[0]], {});
  const result = await streamTemporaryExcelToS3(
    stream,
    dayjs().add(1, 'hour').toDate(),
    'temp/report',
  );
  return result;
};
