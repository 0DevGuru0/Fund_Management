import { TextType } from '$application/components/organisms/tables/Table/InnerTable/CommonText';
import { JournalsApiResponse } from '$application/components/organisms/tables/Table/mockJournalApiResponse';
import { currencySymbol } from '$application/utils/currencySymbol';

import { JournalItemType } from './journalsTable.config';

// Converts a journal item fetched from journals API to supported type for journalsTable
export const journalApiToJournalTableItem = (
  data: JournalsApiResponse[],
): JournalItemType[] => {
  return data.map((journal) => {
    return {
      title: {
        id: journal._id,
        title: journal.title,
        journalType: 'Open Access', // TODO: Currently, we only have Open Access journals
      },
      issn: {
        text: journal.printISSN || '',
        textType: TextType.NormalDark,
      },
      eissn: {
        text: journal.onlineISSN || '',
        textType: TextType.NormalDark,
      },
      subjects: {
        text: journal.subjects.length > 0 ? journal.subjects.join(', ') : '',
        textType: TextType.NormalDark,
      },
      price: {
        // TODO: Assuming that we have abbreviated names (e.g. USD), we need to use currencySymbol to appear the symbols of each currency
        text: journal.apcPrice
          ? `${journal.apcPrice} ${journal.currency && currencySymbol(journal.currency)}`
          : '-',
        textType: TextType.NormalDark,
      },
      publisher: {
        text: journal.publisher.title,
        textType: TextType.NormalDark,
      },
      license: {
        text: journal.licenseType?.join(', ') || 'Other',
        textType: TextType.NormalDark,
      },
      languages: {
        text: journal.languages?.join(', ') || '',
        textType: TextType.NormalDark,
      },
      jcrQuartile: {
        text: journal.jcrQuartile || '',
        textType: TextType.NormalDark,
      },
      sjrQuartile: {
        text: journal.sjrQuartile || '',
        textType: TextType.NormalDark,
      },
      state: {
        // TODO: Currently, we have no information about the state of journal
        label: 'Active',
      },
    };
  });
};
