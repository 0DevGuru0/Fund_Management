import { combineHandlers } from '$api/combineHandlers';
import createJournalGroupApi from '$service/journalGroups/api/addJournalGroupApi';
import getJournalGroupsApi from '$service/journalGroups/api/getJournalGroupsApi';

export default combineHandlers(createJournalGroupApi, getJournalGroupsApi);
