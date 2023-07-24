export const convertQueryStringToArray = (fields: string): string[] =>
  fields ? fields.split(',') : [];
