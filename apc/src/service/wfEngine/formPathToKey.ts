import { NotFoundError } from '$service/errors';

const formPathRegex = /^http[s]?:\/\/(.*)\/(.+?)\.json$/;

export const formPathToKey = (formPath?: string | null): string => {
  if (!formPath || !formPathRegex.test(formPath)) {
    throw new NotFoundError(`form key has not found`);
  }
  const formMatches = formPath.match(formPathRegex)!;
  const formKey = formMatches[2];
  return formKey;
};
