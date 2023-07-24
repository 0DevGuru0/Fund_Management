import { ItemState } from '$application/components/organisms/tables/Table/CornerColumn/ItemState';
import { FilterConfig } from '$application/components/organisms/tables/Table/Filter/filterTypes';
import CommonText, {
  TextType,
} from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { GetPolicies200PoliciesItemAllOfType } from '$application/lib/generated/apcApi.schemas';
import { taskToColor } from '$application/lib/taskToColor';
import { PolicyType } from '$service/doaj/types/PolicyType';

import { PolicyTitle } from './PolicyTitle';

export interface PolicyItemType {
  title: {
    id: string;
    title: string;
    index?: number;
    policyType?: GetPolicies200PoliciesItemAllOfType;
  };
  groups: {
    text: string;
    textType: TextType;
  };
  funder: {
    text: string;
    textType: TextType;
  };
  term: {
    text: string;
    textType: TextType;
  };
  state: {
    label: keyof typeof taskToColor;
  };
}

export const policiesPerPage = 10;

export const policyTableDefinitions = [
  { width: '362px', column: 'title', label: 'Title', renderer: PolicyTitle },
  { width: '273px', column: 'groups', label: 'Journal Groups', renderer: CommonText },
  { width: '180px', column: 'funder', label: 'Funder', renderer: CommonText },
  { width: '375px', column: 'term', label: 'Term', renderer: CommonText },
  { width: '213px', column: 'state', label: 'State', renderer: ItemState },
] as const;

export const policyTableItems: PolicyItemType[] = [
  {
    title: {
      id: '60be19121',
      title: 'Provide a 50% discount code for medicine',
      policyType: 'INVOICE',
    },
    groups: {
      textType: TextType.NormalDark,
      text: 'Provide a 50% discount code for medicine',
    },
    funder: {
      textType: TextType.NormalDark,
      text: 'University of Oxford',
    },
    term: {
      textType: TextType.NormalDark,
      text: 'Lorem Ipsum is simply dummy text of the printing',
    },
    state: {
      label: 'Active',
    },
  },
];

export const policiesFiltersConfig: FilterConfig = {
  inputs: [
    {
      label: 'Type',
      name: 'type',
      items: Object.keys(PolicyType),
    },
  ],
  checkboxes: [
    {
      name: 'states',
      label: 'States',
      checkboxes: [
        {
          label: 'Active',
          name: 'active',
          indicatorColor: taskToColor.Active,
        },
        {
          label: 'Suspended',
          name: 'suspended',
          indicatorColor: taskToColor.Suspended,
        },
      ],
    },
  ],
};
