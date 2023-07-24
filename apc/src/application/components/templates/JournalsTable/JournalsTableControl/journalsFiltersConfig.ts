import { FilterConfig } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import LanguageFilter from '$application/components/templates/JournalsTable/JournalsTableControl/LanguageFilter';
import PublisherFilter from '$application/components/templates/JournalsTable/JournalsTableControl/PublisherFilter';
import SubjectFilter from '$application/components/templates/JournalsTable/JournalsTableControl/SubjectFilter';
// import { taskToColor } from '$application/lib/taskToColor';
import { LicenseType } from '$service/doaj/types/LicenseType';
import { Quartile } from '$service/doaj/types/Quartile';

// import MaxApcFilter from './MaxApcFilter';

export const journalsFiltersConfig: FilterConfig = {
  inputs: [
    {
      label: 'License',
      name: 'license',
      multiSelect: true,
      items: Object.keys(LicenseType),
    },
    {
      label: 'Publisher',
      name: 'publisher',
      multiSelect: true,
      rendererComponent: PublisherFilter,
    },
    {
      label: 'Subject',
      name: 'subject',
      multiSelect: true,
      rendererComponent: SubjectFilter,
    },
    {
      label: 'Language',
      name: 'language',
      multiSelect: true,
      rendererComponent: LanguageFilter,
    },
    {
      label: 'JCR Quartile',
      name: 'jcrQuartile',
      multiSelect: true,
      items: Object.keys(Quartile),
    },
    {
      label: 'SJR Quartile',
      name: 'sjrQuartile',
      multiSelect: true,
      items: Object.keys(Quartile),
    },
    // {
    //   label: 'Maximum APC',
    //   name: 'maxApc',
    //   rendererComponent: MaxApcFilter,
    // },
  ],
  // checkboxes: [
  // {
  //   name: 'states',
  //   label: 'States',
  //   checkboxes: [
  //     {
  //       label: 'Active',
  //       name: 'active',
  //       disabled: true,
  //       indicatorColor: taskToColor.Active,
  //     },
  //     {
  //       label: 'Suspended',
  //       name: 'suspended',
  //       disabled: true,
  //       indicatorColor: taskToColor.Suspended,
  //     },
  //   ],
  // },
  // ],
};
