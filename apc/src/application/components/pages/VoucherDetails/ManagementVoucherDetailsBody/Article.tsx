import React from 'react';

import { capitalize } from 'lodash';
import Link from 'next/link';
import styled from 'styled-components';

import FileTextSVG from '$application/assets/icons/file-text.svg';
import InfoSVG from '$application/assets/icons/info.svg';
import LinkSVG from '$application/assets/icons/link.svg';
import Tooltip from '$application/components/atoms/etc/Tooltip';
import { GetFundApplications200FundApplicationsItem } from '$application/lib/generated/apcApi.schemas';

import { User } from '../ManagementVoucherDetailsBody';
import { BlackText, IconWrapper, Text } from '../sharedStyled';

interface Props {
  fundApplicationData?: GetFundApplications200FundApplicationsItem;
  affiliationTitle: string;
}

export const Article = ({ fundApplicationData, affiliationTitle }: Props) => (
  <ArticleWrapper>
    <ArticleHeader>
      <ArticleIconWrapper $size="24">
        <FileTextSVG />
      </ArticleIconWrapper>
      <ArticleTitle>
        {capitalize(fundApplicationData?.articleTitle ?? 'article')}
      </ArticleTitle>
      {fundApplicationData && (
        <Tooltip title="Link to article">
          <Link href={((fundApplicationData.articleFile as unknown) as any).url}>
            <LinkIconWrapper>
              <LinkIcon />
            </LinkIconWrapper>
          </Link>
        </Tooltip>
      )}
    </ArticleHeader>
    <ArticleBody>
      {fundApplicationData ? (
        <User>
          <FundUserImage src={'/defaultUser.png'} />
          <div>
            <BlackText>{fundApplicationData?.userId}</BlackText>
            <Affiliation>{affiliationTitle}</Affiliation>
          </div>
        </User>
      ) : (
        <>
          <StyledIconWrapper $size="18">
            <InfoSVG />
          </StyledIconWrapper>
          <Text>
            No items have been assigned yet, and if an item is found, it will be displayed
            in this section
          </Text>
        </>
      )}
    </ArticleBody>
  </ArticleWrapper>
);

const StyledIconWrapper = styled(IconWrapper)`
  margin-right: 6px;
`;

const ArticleIconWrapper = styled(IconWrapper)`
  width: 36px;
  background-color: #f7fafe;
  height: 36px;
  align-items: center;
  display: flex;
  justify-content: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.palette.grey[200]};
`;

const LinkIconWrapper = styled.div`
  padding: 8px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  cursor: pointer;
  width: 36px;
  height: 36px;
  box-sizing: border-box;
  &:hover {
    background-color: ${({ theme }) => theme.palette.secondaryLight};
    svg path,
    svg use {
      fill: ${({ theme }) => theme.palette.secondary};
    }
  }
`;

const LinkIcon = styled(LinkSVG)`
  width: 20px;
  height: 20px;
`;

const ArticleBody = styled.div`
  display: flex;
  align-items: center;
  margin-left: 48px;
  margin-top: 16px;
`;

const ArticleHeader = styled.div`
  display: flex;
  align-items: center;
  & > div {
    font-size: 16px;
    font-weight: bold;
  }
`;

const FundUserImage = styled.img`
  width: 36px;
  height: 36px;
  margin-right: 12px;
  border-radius: 50%;
`;

const ArticleWrapper = styled.div`
  margin-top: 36px;
  border-radius: 12px;
  padding: 24px;
  border: solid 1px ${({ theme }) => theme.palette.grey[300]};
  svg {
    use,
    path {
      fill: ${({ theme }) => theme.palette.grey['700']};
    }
  }
`;

const ArticleTitle = styled(BlackText)`
  flex: 1;
  margin-left: 12px;
`;

const Affiliation = styled.div`
  font-family: 14px;
  margin-top: 2px;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

export default Article;
