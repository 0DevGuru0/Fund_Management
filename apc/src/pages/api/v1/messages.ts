import { combineHandlers } from '$api/combineHandlers';
import getMessageTemplatesApi from '$service/messages/api/getMessageTemplatesApi';
import sendMessagesApi from '$service/messages/api/sendMessagesApi';
import upsertMessageTemplateApi from '$service/messages/api/upsertMessageTemplateApi';

export default combineHandlers(
  upsertMessageTemplateApi,
  getMessageTemplatesApi,
  sendMessagesApi,
);
