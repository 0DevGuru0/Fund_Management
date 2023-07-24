import React, { FC } from 'react';

import styled from 'styled-components';

import InfoSVG from '$application/assets/icons/info.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import Modal from '$application/components/atoms/etc/Modal';

export interface DeleteModalProps {
  open: boolean;
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  title,
  description,
  open,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal open={open}>
      <Container>
        <ContentContainer>
          <IconContainer>
            <InfoSVG />
          </IconContainer>
          <TextContainer>
            <Title>{title}</Title>
            <Description>{description}</Description>
          </TextContainer>
        </ContentContainer>
        <ButtonContainer>
          <ButtonStyled
            title="no"
            onClick={() => onCancel && onCancel()}
            color="default"
            variant="contained"
          />
          <ButtonStyledError
            title="I'm Sure"
            focused={true}
            onClick={() => onConfirm && onConfirm()}
            variant="contained"
            color="primary"
          />
        </ButtonContainer>
      </Container>
    </Modal>
  );
};

const Container = styled.div`
  width: 331px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 12px;
  padding: 24px;
  background-color: #fff;
  box-shadow: 0 11px 23px 0 rgba(33, 36, 42, 0.18);
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const IconContainer = styled.div`
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.palette.negativeLight};
  display: flex;
  justify-content: center;
  align-items: center;
  > svg {
    width: 20px;
    height: 20px;

    & path,
    & use {
      fill: ${({ theme }) => theme.palette.negative};
    }
  }
`;
const TextContainer = styled.div`
  margin-left: 12px;
`;
const Title = styled.div`
  color: #000;
  font-size: 16px;
  font-weight: bold;
  line-height: 40px;
`;
const Description = styled.div`
  color: #000;
  font-size: 14px;
  font-weight: normal;
  line-height: 25px;
`;
const ButtonContainer = styled.div`
  align-self: center;
  margin-top: 24px;
`;
const ButtonStyled = styled(Button)`
  margin: 0 6px;
  width: 120px;
`;

const ButtonStyledError = styled(ButtonStyled)`
  button {
    background-color: ${({ theme }) => theme.negative.default} !important;
    border: none !important;
    box-shadow: none !important;

    &:hover {
      background-color: ${({ theme }) => theme.negative.tint1} !important;
      border: none !important;
      box-shadow: none !important;
    }

    &:active {
      background-color: ${({ theme }) => theme.negative.shadow} !important;
      border: none !important;

      &:hover {
        border: none !important;
      }
    }
  }
`;

export default DeleteModal;
