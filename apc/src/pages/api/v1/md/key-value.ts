import { combineHandlers } from '$api/combineHandlers';
import addKeyValueApi from '$service/md/keyValue/api/addKeyValueApi';
import getKeyValueApi from '$service/md/keyValue/api/getKeyValueApi';

export default combineHandlers(addKeyValueApi, getKeyValueApi);
