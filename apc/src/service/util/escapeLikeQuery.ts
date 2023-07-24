export const escapeLikeQuery = (query?: string): string | void =>
  query?.replace('%', '\\%');
