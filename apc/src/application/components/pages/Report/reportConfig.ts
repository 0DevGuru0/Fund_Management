import { getUserRole } from '$application/utils/userRole';

import { useAffiliation } from './reportConfig/useAffiliation';
import { useFunder } from './reportConfig/useFunder';
import { usePolicy } from './reportConfig/usePolicy';
import { usePublisher } from './reportConfig/usePublisher';
import { useSubject } from './reportConfig/useSubject';
import { FormData } from './store';

interface Config {
  name: keyof FormData;
  label: string;
  placeHolder: string;
  searchPlaceHolder: string;
  useGetData: () => any;
  disabled?: boolean;
}

export const filterConfig = (): Config[] => {
  const { role } = getUserRole();
  return [
    {
      name: 'funder',
      label: 'Funder',
      placeHolder: 'Select',
      searchPlaceHolder: 'Type to filter Funder',
      useGetData: useFunder,
      disabled: role === 'FundManager' ? true : false,
    },
    {
      name: 'publisher',
      label: 'Publisher',
      placeHolder: 'Select',
      searchPlaceHolder: 'Type to filter Publisher',
      useGetData: usePublisher,
      disabled: role === 'PublisherAdmin' ? true : false,
    },
    {
      name: 'affiliation',
      label: 'Affiliation',
      placeHolder: 'Select',
      searchPlaceHolder: 'Type to filter Affiliation',
      useGetData: useAffiliation,
    },
  ];
};

export const advancedFilterConfig = [
  {
    name: 'policy',
    label: 'Policy',
    placeHolder: 'Select',
    searchPlaceHolder: 'Type to filter Policy',
    useGetData: usePolicy,
  },
  {
    name: 'subject',
    label: 'Subject',
    placeHolder: 'Select',
    searchPlaceHolder: 'Type to filter Subject',
    useGetData: useSubject,
  },
];
