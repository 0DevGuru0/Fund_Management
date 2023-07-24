interface Input {
  limit?: string;
  skip?: string;
}

export const parseQueryLimitAndSkip = (
  { limit, skip }: Input,
  maxLimit = 50,
): { limit: number; skip: number } => {
  const limitNumber = limit ? parseInt(limit, 10) : 10;
  const skipNumber = skip ? parseInt(skip, 10) : 0;

  return {
    limit: limitNumber > maxLimit ? maxLimit : limitNumber < 0 ? 10 : limitNumber,
    skip: skipNumber < 0 ? 0 : skipNumber,
  };
};
