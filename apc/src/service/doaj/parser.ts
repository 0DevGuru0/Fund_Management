import { uniqWith } from 'lodash';
import { v4 as uuid } from 'uuid';

import { Journal } from '$service/doaj/types/Journal';
import { Language } from '$service/doaj/types/Language';
import { LicenseType } from '$service/doaj/types/LicenseType';
import { Organization } from '$service/doaj/types/Organization';
import { ReviewProcess } from '$service/doaj/types/ReviewProcess';
import { countries } from '$service/util/countries';
import { languages as languageList } from '$service/util/languages';

interface IParsedData {
  journalsList: Journal[];
  publishersList: Organization[];
}

// Parse data extracted from DOAJ dump file
const dataParser = async (journalsData): Promise<IParsedData> => {
  const journalsList: Journal[] = [];
  let publishersList: Organization[] = [];

  journalsData.map((journal) => {
    const journalId = uuid();
    const subjects: string[] = [];
    const languages: Language[] = [];
    const reviewProcess: ReviewProcess[] = [];
    const licenseType: LicenseType[] = [];

    // Some pre-processing
    journal.bibjson.subject.map((subject) => subjects.push(subject.term));
    journal.bibjson.language.map((language: string) =>
      languages.push(languageList[language.toLocaleLowerCase()]),
    );
    journal.bibjson.editorial.review_process.map((item) => {
      const reviewProcessId = (ReviewProcess as any)[item];
      if (reviewProcessId !== undefined) {
        reviewProcess.push(item);
      }
    });
    journal.bibjson.license.map((item) => {
      const licenseTypeId = (LicenseType as any)[item.type];
      if (licenseTypeId !== undefined) {
        licenseType.push(item.type);
      }
    });

    // TODO: We should think about strategies for below issues
    // If title.length < 4, repository throws an error (Sample: UCR)
    const normalizedPublisherTitle =
      journal.bibjson.publisher.name.length > 3
        ? journal.bibjson.publisher.name
        : `${journal.bibjson.publisher.name} Publication`;
    const normalizedJournalTitle =
      journal.bibjson.title.length > 3
        ? journal.bibjson.title
        : `${journal.bibjson.title} Journal`;
    // Does publishersList contains current publisher?
    const currentPublisherName = journal.bibjson.publisher.name;
    const pubDuplicateItem = publishersList.find(
      (publisher) => publisher.title === currentPublisherName,
    );
    const publisherId = pubDuplicateItem ? pubDuplicateItem._id : uuid();

    // Publisher
    publishersList.push({
      _id: publisherId,
      title: normalizedPublisherTitle,
      // Converting country names (e.g. fr to France)
      country: countries[journal.bibjson.publisher.country.toLocaleLowerCase()],
      type: 'Publisher',
    });

    // TODO: we need to find a way to get currency (in abb format, e.g. USD, EUR) and apcPrice - IW-420

    // Journal
    const newJournal: Journal = {
      _id: journalId,
      title: normalizedJournalTitle,
      publisherId: normalizedPublisherTitle,
      onlineISSN: journal.bibjson.eissn,
      printISSN: journal.bibjson.pissn,
      keywords: journal.bibjson.keywords,
      subjects,
      url: journal.bibjson.ref.journal,
      apc: journal.bibjson.apc.has_apc,
      languages,
    };
    if (reviewProcess.length > 0) {
      newJournal.reviewProcess = reviewProcess;
    }
    if (licenseType.length > 0) {
      newJournal.licenseType = licenseType;
    }
    journalsList.push(newJournal);
  });

  // Remove duplicate items from publishers list
  publishersList = uniqWith(
    publishersList,
    (publisherA, publisherB) => publisherA.title === publisherB.title,
  );

  return { journalsList, publishersList };
};

export default dataParser;
