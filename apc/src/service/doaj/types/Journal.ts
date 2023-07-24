import { Journal as IJournal } from '$service/generated/repoGqlTypes';

import { Currency } from './Currency';
import { Language } from './Language';
import { LicenseType } from './LicenseType';
import { Quartile } from './Quartile';
import { RepoTypes } from './RepoTypes';
import { ReviewProcess } from './ReviewProcess';

// TODO: Subjects to have the type "Subjects Tree"
export type Journal = {
  publisherId: string;
  currency?: Currency;
  sjrQuartile?: Quartile;
  jcrQuartile?: Quartile;
  licenseType?: LicenseType[];
  languages: Language[];
  reviewProcess?: ReviewProcess[];
} & Omit<
  IJournal,
  | RepoTypes
  | 'publisher'
  | 'currency'
  | 'sjrQuartile'
  | 'jcrQuartile'
  | 'languages'
  | 'licenseType'
  | 'reviewProcess'
>;
