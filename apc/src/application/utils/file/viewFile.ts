import { base64Validator, urlValidator } from '$application/utils/commonRegex';

import { FileRequest } from './downloadFile';

export const viewFile = (filePath: string): FileRequest => {
  const isUrl: boolean = urlValidator.test(filePath);
  const isBase64: boolean =
    base64Validator.test(filePath.split('base64,')[1]) || base64Validator.test(filePath);

  if (!isUrl && !isBase64) {
    return { succeed: false, error: 'File is not reachable!' };
  }

  try {
    const newTab = window.open();
    const tabTitle = process.env.NEXT_PUBLIC_APP_TITLE;
    if (newTab) {
      newTab.document.write(
        `<title>${tabTitle} - view file</title>
            <body style="overflow: hidden; margin: 0">
            <object width="100%" width="-webkit-fill-available" height="100%" height="-webkit-fill-available" type="application/pdf"
            data="${encodeURI(filePath)}"></object></body>`,
      );
    }
    return { succeed: true };
  } catch (error) {
    return { succeed: false, error: error.message };
  }
};
