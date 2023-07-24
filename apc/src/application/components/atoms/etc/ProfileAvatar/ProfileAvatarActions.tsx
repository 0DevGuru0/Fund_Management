import React, { FC } from 'react';

import styled from 'styled-components';

import IconEdit from '$application/assets/icons/edit-2.svg';
import IconLoader from '$application/assets/icons/loader.svg';
import IconTrash from '$application/assets/icons/trash-2.svg';
import IconX from '$application/assets/icons/x.svg';

interface ProfileAvatarActionsProps {
  hasFile: boolean;
  uploadingProgress: boolean;
  hover: boolean;
  deleteFile: () => void;
  cancelUpload: () => void;
  chooseFile: () => void;
}

const ProfileAvatarActions: FC<ProfileAvatarActionsProps> = ({
  hasFile,
  uploadingProgress,
  hover,
  deleteFile,
  cancelUpload,
  chooseFile,
}) => {
  return (
    <ContentContainer>
      {uploadingProgress ? (
        <>
          <Upload>
            <IconLoader />
            Uploading
          </Upload>
          {hover ? (
            <DeleteContainer onClick={() => cancelUpload()}>
              <IconX />
              cancel
            </DeleteContainer>
          ) : (
            <Optional>Please wait</Optional>
          )}
        </>
      ) : (
        <>
          <Upload onClick={chooseFile}>
            {hasFile ? (
              <>
                <IconEdit />
                Change Picture
              </>
            ) : (
              'Upload Picture'
            )}
          </Upload>

          {hasFile ? (
            <DeleteContainer onClick={() => deleteFile()}>
              <IconTrash />
              Delete
            </DeleteContainer>
          ) : (
            <Optional>Optional</Optional>
          )}
        </>
      )}
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Upload = styled.div`
  color: ${({ theme }) => theme.palette.secondary};
  font-weight: 600;
  font-size: 16px;
  display: flex;
  flex-direction: row;
  margin-bottom: 12px;
  cursor: pointer;

  > svg {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    & path,
    & use {
      fill: ${({ theme }) => theme.palette.secondary};
    }
  }
`;

const Optional = styled.div`
  color: ${({ theme }) => theme.palette.grey[700]};
  font-size: 14px;
  font-weight: normal;
  display: flex;
  flex-direction: row;

  > svg {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    & path,
    & use {
      fill: ${({ theme }) => theme.palette.grey[700]};
    }
  }
`;

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;

  > svg {
    width: 18px;
    height: 18px;
    margin-right: 8px;
    & path,
    & use {
      fill: ${({ theme }) => theme.palette.grey[700]};
    }
  }

  &:hover {
    color: ${({ theme }) => theme.cmp.calendar.badge};

    svg {
      & path,
      & use {
        fill: ${({ theme }) => theme.cmp.calendar.badge};
      }
    }
  }
`;

export default ProfileAvatarActions;
