import { combineHandlers } from '$api/combineHandlers';
import addUserApi from '$service/md/user/api/addUserApi';
import getUserApi from '$service/md/user/api/getUserApi';

export default combineHandlers(addUserApi, getUserApi);
