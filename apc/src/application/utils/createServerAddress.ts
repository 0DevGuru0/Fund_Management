export const createServerAddress = (endpoint): string =>
  `${process.env.NEXT_PUBLIC_API_SERVER_ADDRESS!}/${endpoint}`;
