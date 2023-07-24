import React from 'react';

import TreeView from '@material-ui/lab/TreeView';
import { useAtom } from 'jotai';
import styled from 'styled-components';

import ChevronDown from '$application/assets/icons/chevron-down.svg';
import ChevronRight from '$application/assets/icons/chevron-right.svg';
import { useGetHelpItemsQuery } from '$application/lib/generated/repoGqlTypes';

import Item, { Help } from './LeftContainer/Item';
import { selectedAtom } from './LeftContainer/store';
import { helpAtom } from './store';

interface Props {
  rootID?: string;
}

const LeftContainer = (props: Props) => {
  const { rootID } = props;
  const [help, setHelp] = useAtom(helpAtom);

  const [selected, setSelected] = useAtom(selectedAtom);
  const [{ data, fetching }] = useGetHelpItemsQuery({
    pause: !rootID,
    variables: {
      query: {
        bool: {
          must: [{ match: { schema: 'Help' } }, { match: { parentId: rootID } }],
        },
      },
      sort: {
        'Help.order': { order: 'asc' },
      },
    },
  });

  React.useLayoutEffect(() => {
    if (help === undefined && !fetching) {
      const initialHelp = data?.search.items?.[0] as Help | undefined;
      if (initialHelp) {
        setHelp(initialHelp);
        setSelected(initialHelp.id);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetching, help, setHelp]);

  const handleSelect = (event, nodeId: string) => {
    setSelected(nodeId);
  };

  return (
    <Container
      selected={selected}
      onNodeSelect={handleSelect}
      defaultCollapseIcon={<ChevronDown />}
      defaultExpandIcon={<ChevronRight />}
    >
      {(data?.search.items as Help[])?.map((item) => (
        <Item key={item.id} {...item} onClick={setHelp} />
      ))}
    </Container>
  );
};

export default LeftContainer;

const Container = styled(TreeView)`
  width: 356px;
  border-right: solid 1px ${({ theme }) => theme.palette.grey[400]};
`;
