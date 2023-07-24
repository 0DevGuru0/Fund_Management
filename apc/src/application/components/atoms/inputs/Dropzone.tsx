import React, { FC } from 'react';

import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

import ImageSVG from '$application/assets/icons/image.svg';

import File, { DropZoneFile } from './Dropzone/File';

export interface DropzoneProps {
  maxFiles?: number;
  accept: string | string[];
  onChange?: (files: DropZoneFile[]) => void;
}

export const Dropzone: FC<DropzoneProps> = ({ maxFiles = 1, accept, onChange }) => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    maxFiles,
    accept,
  });

  React.useEffect(() => {
    if (acceptedFiles.length > 0) {
      onChange?.(acceptedFiles);
    }
  }, [acceptedFiles, onChange]);

  return (
    <Container {...getRootProps({ refKey: 'innerRef' })}>
      <input {...getInputProps()} />
      {acceptedFiles.length > 0 ? (
        <Files>
          {acceptedFiles.map((f) => (
            <File key={f.name} file={f} />
          ))}
        </Files>
      ) : (
        <Content>
          <ImageWrapper>
            <ImageSVG />
          </ImageWrapper>
          <div>
            Drag you file here or <Browse />
          </div>
          <div>Accept: {accept}</div>
        </Content>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 12px 0 0;
  padding: 39px 24px;
  border-radius: 8px;
  border: dashed 1px ${({ theme }) => theme.palette.grey['600']};
  cursor: pointer;
`;

const Content = styled.div`
  color: ${({ theme }) => theme.palette.grey['700']};
  font-size: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 9px;
`;

const Browse = styled.span.attrs({
  children: 'Browse',
})`
  color: ${({ theme }) => theme.link.hover};
`;

const ImageWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.palette.secondaryLight};
  border-radius: 4px;

  svg {
    width: 18px;
    height: 18px;
    path,
    use {
      fill: ${({ theme }) => theme.palette.secondary};
    }
  }
`;

const Files = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
