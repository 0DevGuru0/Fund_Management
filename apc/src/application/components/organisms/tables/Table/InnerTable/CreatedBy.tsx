import React, { FC, useState } from 'react';

import styled from 'styled-components';

import FilterSelectorMenu from '$application/components/molecules/etc/FilterSelectorMenu';
import { ItemProps } from '$application/components/molecules/etc/filterSelectorMenu/Item';
import {
  setTaskAssignee,
  useGetTaskById,
  useGetUsersApi,
} from '$application/lib/generated/apcApi';
import { TitleOrganization } from '$service/groups/getTokenRolesSplitted';

export interface CreatedByProps {
  name: string;
  image: any;
  date: string;
  taskId?: string;
  isAdmin?: boolean;
}

interface MinimalFilterSelectorItem {
  id: string;
  label: string;
  selected?: boolean;
}

export const CreatedBy: FC<CreatedByProps> = ({
  name,
  image,
  date,
  taskId,
  isAdmin = false,
}) => {
  const [nameState, setNameState] = useState(name ?? 'Unassigned');
  const [anchorEl, setAnchorEl] = React.useState<Element | undefined>(undefined);
  const { data: linkData, isLoading: isTaskLoading } = useGetTaskById(
    taskId,
    { fields: 'identityLinks' },
    {
      query: {
        enabled: !!anchorEl,
        select: (data) => {
          let tempCandidates: MinimalFilterSelectorItem[] = [];
          let tempAssignees: string[] = [];
          for (const identityLink of data!.identityLinks!) {
            if (identityLink.type === 'candidate') {
              tempCandidates = [
                ...tempCandidates,
                ...identityLink.userIds!.map((userId) => ({
                  id: userId,
                  label: userId,
                  selected: userId === nameState,
                })),
              ];
            } else if (identityLink.type === 'assignee') {
              tempAssignees = [...tempAssignees, ...identityLink.userIds!];
            }
          }
          return { candidates: tempCandidates, assignees: tempAssignees };
        },
      },
    },
  );
  const { data: assigneeUsers, isLoading: isUserLoading } = useGetUsersApi(
    {
      usernames: linkData?.assignees.join(','),
    },
    { query: { enabled: !!linkData?.assignees && linkData?.assignees.length !== 0 } },
  );

  const onOpenDialog = async (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const onCloseDialog = () => {
    setAnchorEl(undefined);
  };

  const onSetAssignee = async (selectedItems: ItemProps[]) => {
    const { id: userId } = selectedItems[0];
    const validUserId = userId !== '0' ? userId : undefined;
    setNameState(validUserId ?? 'Unassigned');
    await setTaskAssignee(taskId, {
      userId: validUserId,
    });
    onCloseDialog();
  };

  return (
    <MainContainer isAdmin={isAdmin}>
      <ImageContainer onClick={onOpenDialog}>
        <Image src={image} />
      </ImageContainer>
      <RightContainer onClick={onOpenDialog}>
        <NameContainer>{nameState}</NameContainer>
        <CreateDateContainer>{date}</CreateDateContainer>
      </RightContainer>
      <FilterSelectorMenu
        items={linkData?.candidates ?? []}
        onChange={onSetAssignee}
        onClose={onCloseDialog}
        anchorEl={anchorEl}
        loading={isTaskLoading || isUserLoading}
        chooseable={!(assigneeUsers?.[0]?.roles as TitleOrganization)?.Researcher}
      />
    </MainContainer>
  );
};

interface IsAdmin {
  isAdmin: boolean;
}

const MainContainer = styled.div<IsAdmin>`
  display: flex;
  width: inherit;
  align-items: stretch;
  background-color: transparent;
  font-size: ${({ theme }) => theme.typography.fontSize};
  cursor: ${({ isAdmin }) => (isAdmin ? 'pointer' : 'inherit')};
  position: relative;
`;

const RightContainer = styled.div`
  width: 100%;
  margin: auto 0;
`;

const CreateDateContainer = styled.div`
  margin-top: 2px;
  line-height: 18px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const NameContainer = styled.div`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.text.hightContrast};
`;

const ImageContainer = styled.div`
  width: 36px;
  height: 36px;
  margin: auto 12px auto 0;
`;

const Image = styled.img`
  width: inherit;
  height: inherit;
  border-radius: 50%;
`;
