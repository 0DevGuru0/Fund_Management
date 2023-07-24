export const generateQueryString = (
  input: string | string[] | undefined | null,
): string | undefined => {
  if (Array.isArray(input)) {
    return input?.[0];
  }
  if (input === null) {
    return undefined;
  }
  return input;
};

export default generateQueryString;
