export const getFormVariables = (): Record<string, string> => ({
  apiServerAddress: process.env.NEXT_PUBLIC_API_SERVER_ADDRESS!,
  subjectTreeId: String(process.env.REPO_SUBJECT_TREE_ID),
});
