import { combineHandlers } from '$api/combineHandlers';
import docsDemoDelete from '$service/openApi/api/docs-demo/docs-demo.delete';
import docsDemoGet from '$service/openApi/api/docs-demo/docs-demo.get';
import docsDemoPost from '$service/openApi/api/docs-demo/docs-demo.post';
import docsDemoPut from '$service/openApi/api/docs-demo/docs-demo.put';

export default combineHandlers(docsDemoGet, docsDemoDelete, docsDemoPost, docsDemoPut);
