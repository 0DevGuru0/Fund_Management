/* eslint-disable no-console */
import React, { FC } from 'react';

import styled from 'styled-components';

import { downloadFile, viewFile } from '$application/utils/file';

import Attachment, { FileProps } from './GeneralInfo/Attachment';

export type GeneralInfoAdditionalInfo =
  | {
      label: string;
      value: string;
      isLink?: true;
    }
  | {
      label: string;
      value: string | number;
      isLink?: false;
    };

export interface GeneralInfoProps {
  descriptionTitle?: string;
  description: string;
  attachment?: FileProps;
  additionalInfo: GeneralInfoAdditionalInfo[];
}

export const GeneralInfo: FC<GeneralInfoProps> = ({
  descriptionTitle = 'Description',
  description,
  attachment,
  additionalInfo,
}) => {
  const handleDownload = (fileName: string, filePath: string, mimeType: string) => {
    const { succeed, error } = downloadFile(fileName, filePath);
    // TODO: console.log in handleDownload and handleView should be replaced by some visual feedbacks
    if (!succeed) {
      console.log('Download Error:', error);
    }
  };

  const handleView = (filePath: string) => {
    const { succeed, error } = viewFile(filePath);
    if (!succeed) {
      console.log('View Error:', error);
    }
  };

  return (
    <Container className="border">
      <InfoContainer>
        <HeadText>{descriptionTitle}</HeadText>
        <Description>{description}</Description>
        <HeadText>Additional Information</HeadText>
        {additionalInfo.map((item, key) => (
          <ItemRow key={key}>
            <Label>{item.label}</Label>
            {item.isLink ? (
              <Link href={item.value}>
                <Value isLink={true}>{item.value}</Value>
              </Link>
            ) : (
              <Value isLink={false}>{item.value}</Value>
            )}
          </ItemRow>
        ))}
      </InfoContainer>
      {attachment && (
        <AttachmentContainer>
          <Attachment
            file={attachment}
            onViewClick={handleView}
            onDownloadClick={handleDownload}
          />
        </AttachmentContainer>
      )}
    </Container>
  );
};

export default GeneralInfo;

const Container = styled.div`
  display: flex;
  flex: 1;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.text.contrast.secondary};
  background-color: ${({ theme }) => theme.background.primary};
  padding: 36px;
`;

const InfoContainer = styled.div`
  flex: 1;
  margin-right: 24px;
`;

const AttachmentContainer = styled.div`
  width: 333px;
`;

const Description = styled.div`
  margin-bottom: 48px;
`;

const HeadText = styled.div`
  line-height: 20px;
  font-weight: bold;
  margin-bottom: 12px;
`;

const ItemRow = styled.div`
  margin-top: 24px;
  display: flex;
`;

const Label = styled.div`
  width: 130px;
  margin-right: 36px;
  color: ${({ theme }) => theme.link.text};
`;

interface TextProps {
  isLink: boolean;
}

const Link = styled.a`
  color: ${({ theme }) => theme.link.hover};
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.link.hover};
  }
`;

const Value = styled.div<TextProps>`
  line-height: 20px;
`;
