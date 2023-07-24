import { combineHandlers } from '$api/combineHandlers';
import addUserToGroupApi from '$service/groups/api/addUserToGroupApi';
import getUserGroupsApi from '$service/groups/api/getUserGroupsApi';

export default combineHandlers(getUserGroupsApi, addUserToGroupApi);
