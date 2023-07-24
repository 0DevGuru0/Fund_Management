import { useAtomValue } from 'jotai/utils';
import { useRouter } from 'next/router';

import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { getUserRole } from '$application/utils/userRole';

import { idMapper, titleMapper } from './reportConfig/itemsMapper';
import { formDataAtom } from './store';

export const useReport = () => {
  const router = useRouter();
  const { roles } = useUserInfo();
  const { role } = getUserRole();

  const {
    status,
    type,
    startDate,
    endDate,
    funder,
    publisher,
    ...formData
  } = useAtomValue(formDataAtom);

  if (!roles.SystemAdmin && (funder.length === 0 || publisher.length === 0)) {
    const returnObj = {
      onViewResult: () => {
        console.log('Nope!');
      },
      viewable: false,
    };

    if (role === 'FundManager' || role === 'FundFinancialManager') {
      if (funder.length === 0) {
        return returnObj;
      }
    }

    if (role === 'PublisherAdmin') {
      if (publisher.length === 0) {
        return returnObj;
      }
    }
  }

  const queryIds = {};
  const queryTitles = {};
  for (const [key, value] of Object.entries({ funder, publisher, ...formData })) {
    queryIds[`${key}Ids`] = idMapper(value);
    queryTitles[`${key}Titles`] = titleMapper(value);
  }
  const query = {
    ...queryIds,
    ...queryTitles,
    status: status ?? '',
    type: type ?? '',
    startDate: startDate ?? '',
    endDate: endDate ?? '',
  };

  const onViewResult = () => {
    if (role === 'PublisherAdmin') {
      router.push({
        pathname: '/publisherAdmin/reports/result',
        query,
      });
    }

    if (role === 'FundManager') {
      router.push({
        pathname: '/fundManager/reports/result',
        query,
      });
    }

    if (role === 'SystemAdmin') {
      router.push({
        pathname: '/management/reports/result',
        query,
      });
    }
  };

  return {
    onViewResult,
    viewable: true,
  };
};
