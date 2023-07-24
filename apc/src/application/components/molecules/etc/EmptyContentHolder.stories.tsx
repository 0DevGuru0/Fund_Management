import React from 'react';

import styled from 'styled-components';

import EmptyInboxSVG from '$application/assets/colored-icons/EmptyInboxSVG.svg';
import NoDocumentsSVG from '$application/assets/colored-icons/NoDocumentsSVG.svg';
import CoffeeSVG from '$application/assets/icons/coffee.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import { StoryFC } from '$application/components/StoryFC';

import { EmptyContentHolder, EmptyContentHolderProps } from './EmptyContentHolder';

export default {
  title: 'Molecules / Empty Content',
  component: EmptyContentHolder,
};

export const NoResultsFound: StoryFC<EmptyContentHolderProps> = (args) => {
  return <EmptyContentHolder {...args} />;
};

export const EmptyJournals = NoResultsFound.bind({});
export const EmptyAdminInbox = NoResultsFound.bind({});
export const EmptyJournalGroup = NoResultsFound.bind({});
export const EmptyResearcherRequests = NoResultsFound.bind({});

const EmptyInbox = styled(EmptyInboxSVG)`
  width: 250px;
  height: 200px;
`;

const NoSearchResult = styled.img`
  width: 465px;
  height: 200px;
  margin-bottom: 12px;
`;

const NoDocuments = styled(NoDocumentsSVG)`
  width: 465px;
  height: 200px;
`;

const NoRequests = styled(CoffeeSVG)`
  width: 250px;
  height: 200px;
`;

NoResultsFound.args = {
  icon: <NoSearchResult src="nothingToCompare.png" />,
  title: 'No Results Found',
  description: 'Try changing filters or the search term.',
};

EmptyAdminInbox.args = {
  icon: <EmptyInbox />,
  title: 'No requests found in your inbox',
  description: 'You can extend the request and assign it to someone',
  actionButton: (
    <Button
      title="Add new"
      color="primary"
      leftIcon="plus"
      customSize="lg"
      variant="outlined"
    />
  ),
};

EmptyJournalGroup.args = {
  icon: <NoDocuments />,
  title: 'No Journal Groups Found',
  description: 'You do not have any journal groups! You can easily make one.',
  actionButton: (
    <Button
      title="Create group"
      color="primary"
      leftIcon="plus"
      customSize="lg"
      variant="outlined"
    />
  ),
};

EmptyJournals.args = {
  icon: <NoDocuments />,
  title: 'No Journals Found',
  description: 'There is no journal available right now. You can add one manually.',
  actionButton: (
    <Button
      title="Add Journal"
      color="primary"
      leftIcon="plus"
      customSize="lg"
      variant="outlined"
    />
  ),
};

EmptyResearcherRequests.args = {
  icon: <NoRequests />,
  title: 'Dear Researcher',
  description:
    'You have not submitted any requests yet! If you have a research item or request to submit and publish, register it now.',
  actionButton: (
    <Button
      title="Apply for Fund"
      leftIcon="check"
      color="primary"
      customSize="lg"
      variant="outlined"
    />
  ),
};

NoResultsFound.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2c9551662da1664f44b82',
};

EmptyAdminInbox.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2c8dad18dc0130021fa41',
};

EmptyJournals.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60d2ca5a9f344c11b5199d93',
};

EmptyJournalGroup.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/60865602084a7012b372e417/screen/60e1a4ad90c30f11a1c2508b',
};

EmptyResearcherRequests.parameters = {
  zeplinLink:
    'https://app.zeplin.io/project/607d33693ea7778ad9c2fb17/screen/60d2cfa0d18dc01300223e51',
};
