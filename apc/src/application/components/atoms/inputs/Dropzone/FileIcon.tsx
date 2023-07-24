import React, { FC } from 'react';

import FileCSV from '$application/assets/icons/components-file-xls.svg';

export interface FileIconProps {
  type: string;
}

const FileIcon: FC<FileIconProps> = ({ type }) => {
  switch (type) {
    case 'text/csv':
      return <FileCSV />;
    default:
      return null;
  }
};

export default FileIcon;
