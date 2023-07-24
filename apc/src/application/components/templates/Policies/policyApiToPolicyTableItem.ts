import { TextType } from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { GetPolicies200PoliciesItem } from '$application/lib/generated/apcApi.schemas';

import { PolicyItemType } from './config';

export interface TitlesMap {
  [id: string]: {
    id: string;
    title: string;
  };
}

const policyApiToPolicyTableItem = (
  data: GetPolicies200PoliciesItem[],
  titlesMap: TitlesMap,
): PolicyItemType[] =>
  data.map((policy) => ({
    title: {
      id: policy?.id ?? 'N/A',
      title: policy?.title ?? 'N/A',
      policyType: policy?.type,
    },
    groups: {
      textType: TextType.NormalDark,
      // TODO fix API doc generator types
      // @ts-ignore
      text: policy.journalGroups.map((jg) => jg.journalGroup.title).join(', '),
    },
    funder: {
      textType: TextType.NormalDark,
      text: titlesMap?.[policy?.fundId]?.title ?? 'N/A',
    },
    term: {
      textType: TextType.NormalDark,
      text: policy?.terms ?? 'N/A',
    },
    state: {
      label: policy?.isActive ? 'Active' : 'Suspended',
    },
  }));

export default policyApiToPolicyTableItem;
