import React, { FC, useState } from 'react';

import styled from 'styled-components';
import truncate from 'truncate-middle';

import PdfSVG from '$application/assets/colored-icons/PDF.svg';
import DownloadSVG from '$application/assets/icons/download.svg';
import ViewFilledSVG from '$application/assets/icons/eye-fill.svg';
import ViewSVG from '$application/assets/icons/eye.svg';

export interface FileProps {
  name: string;
  path: string;
  volume: string;
  createdDate: string;
  type: string;
}

export interface AttachmentProps {
  file: FileProps;
  onViewClick: (filePath: string) => void;
  onDownloadClick: (fileName: string, filePath: string, mimeType: string) => void;
}

export const Attachment: FC<AttachmentProps> = ({
  file,
  onViewClick,
  onDownloadClick,
}) => {
  const [viewHovered, setViewHovered] = useState(false);
  const truncatedFileName = truncate(file.name, 11, 14, '...');

  return (
    <Container>
      <HeaderSection>
        <Title>Attached File</Title>
        <ButtonsSection>
          <Button
            title="Download"
            variant="Green"
            onClick={() => {
              onDownloadClick(file.name, file.path, file.type);
            }}
          >
            <DownloadSVG />
          </Button>
          <Button
            title="View"
            variant="Blue"
            onClick={() => onViewClick(file.path)}
            onMouseOver={() => setViewHovered(true)}
            onMouseOut={() => setViewHovered(false)}
          >
            {viewHovered ? <ViewFilledSVG /> : <ViewSVG />}
          </Button>
        </ButtonsSection>
      </HeaderSection>
      <FileSection>
        <File>
          <PdfSVG />
        </File>
        <div>
          <FileName>{truncatedFileName}</FileName>
          <FileInfo>{`${file.volume} - ${file.createdDate}`}</FileInfo>
        </div>
      </FileSection>
    </Container>
  );
};

export default Attachment;

const Container = styled.div`
  padding: 24px;
  border-radius: 8px;
  border: dashed 1px ${({ theme }) => theme.text.lowContrast};
  background-color: ${({ theme }) => theme.background.primary};
`;

const HeaderSection = styled.div`
  width: 100%;
  margin-bottom: 22px;
  display: flex;
`;

const Title = styled.div`
  flex: 1;
  margin: auto 0;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.text.contrast.primary};
`;

const ButtonsSection = styled.div`
  display: inline-flex;
`;

interface ButtonProps {
  variant: 'Blue' | 'Green';
}

const Button = styled.div<ButtonProps>`
  padding: 3px;
  width: 18px;
  height: 18px;
  margin-left: 6px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.background.secondary};
  & > svg path,
  use {
    fill: ${({ theme }) => theme.text.contrast.primary};
  }
  &:hover {
    cursor: pointer;
    background-color: ${({ theme, variant }) =>
      variant === 'Blue' ? theme.cmp.button.tertiary : theme.cmp.button.secondary};
    & > svg path,
    use {
      fill: ${({ theme, variant }) =>
        variant === 'Blue' ? theme.palette.primary : theme.palette.secondary};
    }
  }
`;

const FileSection = styled.div`
  width: 100%;
  font-size: 10px;
  line-height: 12px;
  display: flex;
`;

const File = styled.div`
  width: 30px;
  height: 36px;
  margin-right: 12px;
`;

const FileName = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const FileInfo = styled.div`
  color: ${({ theme }) => theme.text.contrast.primary};
`;
