export interface FileRequest {
  succeed: boolean;
  error?: string;
}

export const downloadFile = (fileName: string, filePath: string): FileRequest => {
  try {
    const aTag = document.createElement('a');
    aTag.href = filePath;
    aTag.download = fileName;
    aTag.click();
    return { succeed: true };
  } catch (error) {
    return { succeed: false, error: (error as Error).message };
  }
};
