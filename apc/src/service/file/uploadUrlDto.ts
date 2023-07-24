import { JSONSchemaType } from '$service/validator/ajvTypes';

import { UploadSignedUrl } from './getFileUploadSignedUrl';

export const uploadUrlDto: JSONSchemaType<UploadSignedUrl> = {
  type: 'object',
  properties: {
    url: {
      type: 'string',
    },
    fields: {
      type: 'object',
    },
    fileKey: {
      type: 'string',
    },
  },
};
