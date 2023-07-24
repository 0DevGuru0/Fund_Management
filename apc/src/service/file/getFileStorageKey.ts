export const getFileStorageKey = (hashFileName: string, orgId: string): string =>
  `${orgId}/${hashFileName}`;
