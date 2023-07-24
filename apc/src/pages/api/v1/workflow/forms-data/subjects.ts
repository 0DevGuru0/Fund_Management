import { orderBy } from 'lodash';

import { ApiHandler } from '$api/APIHandler';
import { withMiddleware } from '$api/withMiddleware';
import { getGraphqlClient } from '$data/graphql/graphQLClient';
import { NotFoundError } from '$service/errors';
import { getSdk } from '$service/generated/repoGqlTypes';

interface Query {
  treeId: string;
  parentSubjectId: string;
  [key: string]: string | string[];
}

interface ISubjectTreeNodes {
  __typename?: 'TreeNode';
  title: string;
  id: string;
  children?: string[] | null;
}

type Response = {
  title: string;
  id: string;
}[];

const subjects: ApiHandler<any, Response, Query> = async (req) => {
  const client = getGraphqlClient(req.headers.authorization);

  const { getSubjectsRootTree } = getSdk(client);

  const { treeId, parentSubjectId } = req.query;

  const subjectsTree = await getSubjectsRootTree({
    id: treeId,
  });

  let result: ISubjectTreeNodes[];

  if (parentSubjectId) {
    const treeNode = subjectsTree.tree.nodes.find((node) => node.id === parentSubjectId);

    if (treeNode) new NotFoundError();

    result = subjectsTree.tree.nodes.filter((node) =>
      treeNode?.children?.includes(node.id),
    );
  } else {
    result = subjectsTree.tree.nodes.filter((node) =>
      subjectsTree.tree.rootNodesId.includes(node.id),
    );
  }

  const notSortResult = result.map((node) => ({ id: node.id, title: node.title }));
  return orderBy(notSortResult, [(item) => item.title.toLowerCase()], ['asc']);
};

export default withMiddleware(subjects)({
  operationId: 'getSubjects',
  description: 'get subjects tree',
  method: 'GET',
  isPublic: true,
  query: {
    type: 'object',
    properties: {
      treeId: {
        type: 'string',
        openApiIn: 'query',
      },
      parentSubjectId: {
        type: 'string',
        openApiIn: 'query',
      },
    },
    required: ['treeId'],
  },
  response: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
      },
      required: ['id', 'title'],
    },
    nullable: true,
  },
});
