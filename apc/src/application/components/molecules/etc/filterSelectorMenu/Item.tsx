import React, { FC } from 'react';

import styled from 'styled-components';

import { Checkbox } from '$application/components/atoms/inputs/CheckBox';

export interface ItemProps {
  multiSelect: boolean;
  id: string;
  label: string;
  selected?: boolean;
  avatar?: string;
  onClick?: (item: ItemProps) => void;
}

const Item: FC<ItemProps> = ({
  multiSelect,
  id,
  label,
  selected,
  avatar = '/emailAvatarPlaceholder.png',
  onClick,
}) => {
  return (
    <Container
      onClick={() => onClick && onClick({ id, label, selected, avatar, multiSelect })}
    >
      {multiSelect && (
        <CheckboxStyled
          id={id}
          isChecked={selected}
          onChange={() =>
            onClick && onClick({ id, label, selected, avatar, multiSelect })
          }
        />
      )}
      <AvatarContainer selected={selected && !multiSelect}>
        <Avatar src={avatar} />
      </AvatarContainer>
      <Label selected={selected}>{label}</Label>
    </Container>
  );
};

interface SelectedProps {
  selected?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  margin: 3px 0;
  height: 42px;
  width: 100%;
  border-radius: 5px;
  align-items: center;
  &:hover {
    background-color: ${({ theme }) => theme.palette.secondaryLight};
  }
`;

const AvatarContainer = styled.div<SelectedProps>`
  border-radius: 100px;
  width: 36px;
  height: 36px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 9px;
  background-color: #fff;
  border: ${(props) => {
    const border = `1px solid ${props.theme.palette.primary}`;
    return props.selected ? border : 'none';
  }};
`;

const Avatar = styled.img`
  border-radius: 100px;
  width: 30px;
  height: 30px;
  border: solid 1px ${({ theme }) => theme.palette.grey[300]};
`;

const Label = styled.div<SelectedProps>`
  font-size: 14px;
  color: #000;
  margin-left: 10px;
  font-weight: ${(props) => (props.selected ? 600 : 'normal')};
`;

const CheckboxStyled = styled(Checkbox)`
  margin: 0 -12px 25px 40px;
`;

export default Item;
