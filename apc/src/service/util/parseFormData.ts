import formidable from 'formidable';

import { QueryObject, TypedRequest } from '$api/APIHandler';

export const parseFormData = async (
  req: TypedRequest<any, QueryObject>,
  uploadStream: (file: any) => void,
): Promise<{ fields: formidable.Fields; files: formidable.Files }> =>
  new Promise((resolve, reject) => {
    const form = formidable({
      fileWriteStreamHandler: uploadStream,
    });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

export default parseFormData;
