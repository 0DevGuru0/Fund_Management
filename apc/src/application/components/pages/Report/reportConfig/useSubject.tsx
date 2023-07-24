import { useGetSubjectsRootTreeQuery } from '$application/lib/generated/repoGqlTypes';

import itemsMapper from './itemsMapper';

export const useSubject = () => {
  const [subjectsTree] = useGetSubjectsRootTreeQuery({
    variables: {
      id: process.env.REPO_SUBJECT_TREE_ID ?? '',
    },
  });

  const subjectsTitle = subjectsTree.data?.tree.nodes.filter((node) =>
    subjectsTree.data?.tree.rootNodesId.includes(node.id),
  );

  return {
    items: subjectsTitle ? itemsMapper(subjectsTitle) : [],
  };
};
