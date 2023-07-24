import React from 'react';

import Base from '@material-ui/lab/TreeItem';
import { useAtomValue } from 'jotai/utils';
import styled from 'styled-components';

import { useGetHelpItemsQuery } from '$application/lib/generated/repoGqlTypes';

import { selectedAtom } from './store';

export interface Help {
  id: string;
  label: string;
  content?: string;
  tags?: string[];
  items?: Help[];
}

interface Props extends Omit<Help, 'items'> {
  onClick?: (help: Help) => void;
}

const Item = (props: Props) => {
  const { id, label } = props;
  const { onClick, ...help } = props;

  const selectedNode = useAtomValue(selectedAtom);
  const [{ data }] = useGetHelpItemsQuery({
    variables: {
      query: {
        bool: {
          must: [{ match: { schema: 'Help' } }, { match: { parentId: id } }],
        },
      },
      sort: {
        'Help.order': { order: 'asc' },
      },
    },
  });

  const selected = selectedNode === id;

  return (
    <TreeItem
      id={id}
      nodeId={id}
      label={label}
      icon={selected ? <Rectangle /> : undefined}
      className={selected ? 'Mui-selected' : undefined}
      onClick={() => onClick?.({ ...help, items: data?.search.items as Help[] })}
    >
      {(data?.search.items as Help[])?.map((item) => (
        <Item key={item.id} {...item} onClick={onClick} />
      ))}
    </TreeItem>
  );
};

export default Item;

const Rectangle = styled.div`
  width: 3px;
  height: 16px;
  border-radius: 1px;
  background-color: ${({ theme }) => theme.palette.primary};
`;

const TreeItem = styled(Base)`
  &,
  &:hover > .MuiTreeItem-content .MuiTreeItem-label {
    background-color: transparent;
  }

  &.Mui-selected > .MuiTreeItem-content .MuiTreeItem-label,
  &.Mui-selected:focus > .MuiTreeItem-content .MuiTreeItem-label {
    background-color: transparent;

    :not(&.Mui-expanded) {
      color: ${({ theme }) => theme.palette.primary};
      font-weight: bold;
    }
  }

  margin: 12px 0;
`;
