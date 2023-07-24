import getSymbolFromCurrency from 'currency-symbol-map';
import dayjs from 'dayjs';

import { GeneralInfoAdditionalInfo } from '$application/components/molecules/cards/GeneralInfo';
import { GetProcessInstanceById200 } from '$application/lib/generated/apcApi.schemas';

import APCFundRequestVariables from './APCFundRequestVariables';

export const getAdditionalInfo = (
  processInstance: GetProcessInstanceById200,
  variables: APCFundRequestVariables,
): GeneralInfoAdditionalInfo[] => {
  const {
    affiliation,
    orcid,
    publisher,
    journal,
    publishPrice,
    subjectCategory,
    mainSubject,
    currency,
  } = variables;

  return [
    {
      label: 'Created by',
      value: processInstance.startUserId ?? '-',
    },
    {
      label: 'Affiliation',
      value: affiliation.title,
    },
    {
      label: 'ORCID',
      value: `https://orcid.org/${orcid}`,
      isLink: true,
    },
    {
      label: 'Publisher',
      value: publisher.title,
    },
    (journal && {
      label: 'Journal',
      value: journal.title,
    }) as any,
    {
      label: 'Price',
      value: `${getSymbolFromCurrency(currency)}${publishPrice}`,
    },
    {
      label: 'Subject Categories',
      value: subjectCategory?.title,
    },
    {
      label: 'Main Subject',
      value: mainSubject?.title,
    },
    {
      label: 'Date Created',
      value: dayjs(processInstance.startTime ?? '').format('DD MMM YYYY') || '-',
    },
  ].filter((item) => item);
};
