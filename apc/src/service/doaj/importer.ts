import { reject } from 'lodash';
import getConfig from 'next/config';

import elasticBulkFetch from '$service/doaj/bulkFetch';
import elasticBulkInsert from '$service/doaj/bulkInsert';
import { Journal } from '$service/doaj/types/Journal';
import { Organization } from '$service/doaj/types/Organization';
import {
  CreateJournalsDocument,
  CreateOrganizationsDocument,
  GetAllJournalsDocument,
  GetAllOrganizationsDocument,
} from '$service/generated/repoGqlTypes';
import { sysLog } from '$service/logger';

const { serverRuntimeConfig } = getConfig();

const parentPublisher = serverRuntimeConfig.REPO_PARENT_ID_ORGANIZATION;
const parentIdJournal = serverRuntimeConfig.REPO_PARENT_ID_JOURNAL;
let finalItemsList: any = [];

const dataImporter = async (
  journalsList: Journal[],
  publishersList: Organization[],
): Promise<void> => {
  try {
    sysLog.info(`Fetching the list of existing publishers ...`);

    let mustQuery = [
      { match: { schema: 'Organization' } },
      { match: { 'Organization.type': 'Publisher' } },
    ];
    const publishersResponse = await elasticBulkFetch(
      GetAllOrganizationsDocument,
      mustQuery,
    );
    sysLog.info(`Found ${publishersResponse.numberOfResults} publishers in database`);

    sysLog.info(`Finding duplicate publishers ...`);
    const existingPublishers = publishersResponse.finalItems;
    // Constructing final publishersList to import by removing existing items
    finalItemsList = reject(publishersList, (element) =>
      existingPublishers.find((item) => item.title === element.title),
    );
    sysLog.warn(`Remaining publishers to import: ${finalItemsList.length}`);

    if (finalItemsList.length > 0) {
      sysLog.info(`Inserting publishers ...`);
      finalItemsList = finalItemsList.map(({ id, type, ...item }) => ({
        ...item,
        parentId: parentPublisher,
        type: 'Publisher',
      }));

      // Sending publishers to repository
      const response = await elasticBulkInsert(
        CreateOrganizationsDocument,
        finalItemsList,
        'Organization',
      );
      sysLog.info(`Inserted ${response.length} publishers`);

      // Adding new publishers to the list of publishers
      response.map((createdItem) => {
        existingPublishers.push(createdItem);
      });
    }

    // Note: this is done to provide proper Ref in Repository
    // We have initialized journal's publisherId with the publisher's name
    sysLog.info(`Updating journals "publisherId" fields according to new publishers`);
    journalsList.map((journal) => {
      journal.publisherId = existingPublishers.find(
        (publisher) => publisher.title === journal.publisherId,
      )._id;
    });

    finalItemsList = [];

    sysLog.info(`Fetching the list of existing journals ...`);
    mustQuery = [{ match: { schema: 'Journal' } }];
    const journalsResponse = await elasticBulkFetch(GetAllJournalsDocument, mustQuery);
    sysLog.info(`Found ${journalsResponse.numberOfResults} journals in database`);

    sysLog.info(`Finding duplicate journals ...`);
    const existingJournals = journalsResponse.finalItems;
    // Constructing final journalList to import by removing existing items
    finalItemsList = reject(journalsList, (element) =>
      existingJournals.find((item) => item.title === element.title),
    );
    sysLog.warn(`Remaining journals to import: ${finalItemsList.length}`);

    if (finalItemsList.length > 0) {
      sysLog.info(`Inserting journals ...`);
      finalItemsList = finalItemsList.map(({ id, publisherId, ...item }) => ({
        ...item,
        publisher: publisherId,
        parentId: parentIdJournal,
      }));

      // Sending journals to repository
      const response = await elasticBulkInsert(
        CreateJournalsDocument,
        finalItemsList,
        'Journal',
      );
      sysLog.info(`Inserted ${response.length} journals`);
    }
  } catch (err) {
    sysLog.error(`Error while importing data: ${err}`);
  }
};

export default dataImporter;
