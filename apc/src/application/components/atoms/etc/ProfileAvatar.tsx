import React, { FC, useRef, useState } from 'react';

import Axios from 'axios';
import styled from 'styled-components';

import IconCloud from '$application/assets/icons/upload-cloud.svg';
import { getUploadUrl } from '$application/lib/generated/apcApi';

import ProfileAvatarActions from './ProfileAvatar/ProfileAvatarActions';

const axiosClient = Axios.create();
let cancelToken = Axios.CancelToken;
let source = cancelToken.source();

export interface ProfileAvatarProps {
  existLogoUrl?: string;
  maxSize?: number;
  onChange: (string) => void;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({ existLogoUrl, onChange }) => {
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [avatarUrl, setAvatarUrl] = useState<string>(existLogoUrl ?? '');
  const [hover, setHover] = useState<boolean>(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const uploadSelectedFile = async (selectedFile) => {
    try {
      setUploading(true);
      setProgress(0);
      const url = await getUploadUrl({
        fileName: String(selectedFile.name),
        mimeType: String(selectedFile.type),
      });
      if (!url || !url.fields) {
        setUploading(false);
        return;
      }

      const formData = new FormData();
      let fileKey = '';
      let bucket = '';
      Object.keys(url.fields).forEach((key) => {
        if (url.fields) {
          switch (key) {
            case 'key':
              fileKey = url.fields[key];
              break;
            case 'bucket':
              bucket = url.fields[key];
              break;
          }

          formData.append(key, String(url.fields[key]));
        }
      });
      formData.append('file', selectedFile);
      await axiosClient.request({
        method: 'POST',
        url: url.url,
        data: formData,
        cancelToken: source.token,
        onUploadProgress: (item) => {
          const progressAmountValue = (item.loaded * 100) / item.total;
          setProgress(parseInt(String(progressAmountValue), 10));
        },
      });
      const newAvatarUrl = `https://${bucket}.s3.eu-central-1.amazonaws.com/${fileKey}`;
      setAvatarUrl(newAvatarUrl);
      setUploading(false);
      onChange(newAvatarUrl);
    } catch (error) {
      setUploading(false);
    }

    cancelToken = Axios.CancelToken;
    source = cancelToken.source();
  };

  const cancelUpload = () => {
    source.cancel('Operation canceled by the user.');
    setUploading(false);
    setProgress(0);
  };

  const deleteFile = () => {
    setAvatarUrl('');
    onChange('');
  };

  const openFileChooser = () => {
    if (fileRef && fileRef.current) {
      fileRef.current.click();
    }
  };

  const onFileSelected = async (event) => {
    const selectedFile = event.target.files[0];
    uploadSelectedFile(selectedFile);
  };

  return (
    <div onMouseOut={() => setHover(false)} onMouseOver={() => setHover(true)}>
      <ProfileContainer>
        <LogoContainer file={avatarUrl} onClick={openFileChooser}>
          {!avatarUrl && !uploading && <IconCloud />}
          {uploading && <ProgressContainer>{progress} %</ProgressContainer>}
        </LogoContainer>

        <ProfileAvatarActions
          chooseFile={openFileChooser}
          hover={hover}
          cancelUpload={cancelUpload}
          deleteFile={deleteFile}
          uploadingProgress={uploading}
          hasFile={avatarUrl ? true : false}
        />
      </ProfileContainer>
      <input
        ref={fileRef}
        type="file"
        onChange={onFileSelected}
        accept="image/png, image/jpeg"
        style={{ display: 'none' }}
      />
    </div>
  );
};

interface LogoContainerProps {
  file: any;
}

const ProfileContainer = styled.div`
  display: flex;
`;

const LogoContainer = styled.div<LogoContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  overflow: hidden;
  width: 84px;
  height: 84px;
  background-size: cover;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  background-image: ${({ file }) => (file ? `url(${String(file)})` : 'none')};
  cursor: pointer;

  > svg {
    width: 20px;
    height: 20px;
    & path,
    & use {
      fill: ${({ theme }) => theme.palette.grey[700]};
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.secondaryLight};

    svg {
      & path,
      & use {
        fill: ${({ theme }) => theme.palette.secondary};
      }
    }
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-weight: 600;
  font-size: 24px;
`;

export default ProfileAvatar;
