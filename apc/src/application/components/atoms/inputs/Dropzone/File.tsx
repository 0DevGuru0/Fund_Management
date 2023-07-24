import React, { FC } from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import styled from 'styled-components';

import FileIcon from './FileIcon';

dayjs.extend(relativeTime);

export interface DropZoneFile extends Blob {
  readonly lastModified: number;
  readonly name: string;
}

export interface FileProps {
  file: DropZoneFile;
}

const File: FC<FileProps> = ({ file: { type, name, size, lastModified } }) => {
  return (
    <Container>
      <FileIcon type={type} />
      <Description>
        <Title>{name}</Title>
        <Subtitle>
          {size ?? 0} bytes - {dayjs(lastModified).fromNow()}
        </Subtitle>
      </Description>
    </Container>
  );
};

export default File;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 12px;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const Subtitle = styled.div`
  font-size: 10px;
  line-height: 1.2;
  color: ${({ theme }) => theme.text.contrast.primary};
`;
