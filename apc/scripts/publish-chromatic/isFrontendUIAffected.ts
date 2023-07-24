const frontendSrcChangePattern = new RegExp(
  /^apc\/src\/application\/(components|theme)\/.*/,
);

export const isFrontendUIAffected = (changedFiles: string[]): boolean => {
  const frontendChanges = changedFiles.filter((changedFile) =>
    frontendSrcChangePattern.test(changedFile),
  );

  return frontendChanges.length > 0;
};
