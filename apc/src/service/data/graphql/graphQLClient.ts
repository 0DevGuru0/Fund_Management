import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_REPO_SERVER_ADDRESS;

export const getGraphqlClient = (accessToken?: string): GraphQLClient => {
  return new GraphQLClient(endpoint!, {
    // TODO: IW-452
    // headers: accessToken
    //   ? {
    //       authorization: accessToken,
    //     }
    //   : undefined,
  });
};
