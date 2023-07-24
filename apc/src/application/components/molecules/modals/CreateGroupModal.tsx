// TODO: refactor this component.
/* eslint-disable max-lines */
import React, { FC, useState } from 'react';

import esb from 'elastic-builder';
import { useUpdateAtom } from 'jotai/utils';
import { isEmpty } from 'lodash';
import styled, { css } from 'styled-components';

import { Button } from '$application/components/atoms/buttons/Button';
import { Search } from '$application/components/molecules/inputs/Search';
import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';
import { selectedRowsAtom } from '$application/components/pages/Journals/JournalsList/store';
import {
  useAddJournalGroup,
  useAddJournalsToJournalGroup,
} from '$application/lib/generated/apcApi';
import {
  useGetFundsNameQuery,
  useGetPublishersNameQuery,
} from '$application/lib/generated/repoGqlTypes';

import { Item } from '../etc/Menu';

import CustomizedSwitch from './CreateGroupModal/CustomizedSwitch';
import RegularModal from './RegularModal';

export interface CreateGroupModalProps {
  className?: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (value: any) => void;
  onCancel: () => void;
  onSwitchChecked?: (value: boolean) => void;
  onPublisherSelect?: (value: Item) => void;
  onFundSelect?: (value: Item) => void;
  selectedJournals?: string[];
}

const limit = 10;
const fundInitQuery = esb
  .boolQuery()
  .must(esb.matchQuery('schema.keyword', 'Organization'))
  .filter(esb.termQuery('Organization.type.keyword', 'Fund'));
const publisherInitQuery = esb
  .boolQuery()
  .must(esb.matchQuery('schema.keyword', 'Organization'))
  .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));

export const CreateGroupModal: FC<CreateGroupModalProps> = ({
  className,
  open,
  onClose,
  onSubmit,
  onCancel,
  onSwitchChecked,
  onPublisherSelect,
  onFundSelect,
  selectedJournals,
}) => {
  const [groupName, setGroupName] = useState('');
  const [offsetFund, setOffsetFund] = useState(0);
  const [offsetPublisher, setOffsetPublisher] = useState(0);
  const [isSwitchChecked, setSwitchChecked] = useState(true);
  const [publisherElasticQuery, setPublisherElasticQuery] = useState<esb.BoolQuery>(
    publisherInitQuery,
  );
  const [fundElasticQuery, setFundElasticQuery] = useState<esb.BoolQuery>(fundInitQuery);
  const [selectedFunds, setSelectedFunds] = useState<Item[]>([]);
  const [selectedPublishers, setSelectedPublishers] = useState<Item[]>([]);
  const [fundError, setFundError] = useState('');
  const [publisherError, setPublisherError] = useState('');
  const [groupNameError, setGroupNameError] = useState('');
  const [buttonLoading, setButtonLoading] = useState(false);

  const [{ data: fundsData }] = useGetFundsNameQuery({
    pause: isEmpty(fundElasticQuery),
    variables: {
      limit,
      offset: offsetFund,
      query: fundElasticQuery,
    },
  });

  const [{ data: publishersData }] = useGetPublishersNameQuery({
    pause: isEmpty(publisherElasticQuery),
    variables: {
      limit,
      offset: offsetPublisher,
      query: publisherElasticQuery,
    },
  });

  const mappedPublishersData: Item[] =
    publishersData?.search.items.map((item) => ({
      label: item.title,
      id: item.id,
    })) ?? [];

  const mappedFundsData: Item[] =
    fundsData?.search.items.map((item) => ({
      label: item.title,
      id: item._id,
    })) ?? [];

  const onPublisherFilterTermChanged = (newTerm: string) => {
    let query;
    if (newTerm) {
      query = esb
        .boolQuery()
        .must(esb.multiMatchQuery(['title^2', 'title.suggestion'], newTerm))
        .filter(esb.termQuery('schema.keyword', 'Organization'))
        .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));
    }
    setPublisherElasticQuery(query ?? publisherInitQuery);
  };

  const onFundFilterTermChanged = (newTerm: string) => {
    let query;
    if (newTerm) {
      query = esb
        .boolQuery()
        .must(esb.matchQuery('schema.keyword', 'Organization'))
        .filter(esb.termQuery('Organization.type.keyword', 'Fund'))
        .filter(esb.matchQuery('title', newTerm));
    }
    setFundElasticQuery(query ?? fundInitQuery);
  };

  const onSwitchCheckChanged = () => {
    // TODO: temporarily, switch is set to true
    onSwitchChecked?.(true || !isSwitchChecked);
    setSwitchChecked(true || !isSwitchChecked);
  };

  const onChangeGroupName = (name: string) => {
    setGroupName(name);
    setGroupNameError('');
  };

  const handleFundSelect = (items: any) => {
    setSelectedFunds([items]);
    setFundError('');
    onFundSelect?.(items);
  };

  const handlePublisherSelect = (items: any) => {
    setSelectedPublishers([items]);
    setPublisherError('');
    onPublisherSelect?.(items);
  };

  const createJournalGroup = useAddJournalGroup();
  const addJournalsToGroup = useAddJournalsToJournalGroup();

  const setSelectedRows = useUpdateAtom(selectedRowsAtom);

  const onSubmitHandle = async () => {
    const hasGroupNameError = groupName ? '' : 'this field is required';
    const hasFundError = selectedFunds.length > 0 ? '' : 'this field is required';
    const hasPublisherError =
      isSwitchChecked && selectedPublishers.length === 0 ? 'this field is required' : '';
    setFundError(hasFundError);
    setPublisherError(hasPublisherError);
    setGroupNameError(hasGroupNameError);

    if (hasGroupNameError || hasFundError || hasPublisherError) {
      return;
    }

    setButtonLoading(true);

    const data = {
      title: groupName,
      fundId: selectedFunds[0].id,
      publisherId: selectedPublishers[0].id,
    };

    const result = await createJournalGroup.mutateAsync({
      data,
    });
    if (selectedJournals) {
      await addJournalsToGroup.mutateAsync({
        journalGroupId: result.id,
        data: {
          journalIds: selectedJournals,
        },
      });
    }

    setSelectedRows({});
    setButtonLoading(false);
    onSubmit(result);
  };

  return (
    <RegularModal
      className={className}
      onClose={onClose}
      open={open}
      mainTitle="Create Group"
      subTitle="Create a new group for journals. You can also restrict it to a Publisher."
      paperStyle={paperStyle}
      actions={() => actionButtons({ onSubmit: onSubmitHandle, onCancel, buttonLoading })}
    >
      <StyledSearch
        label="Group Name"
        startAdornment
        onChange={onChangeGroupName}
        errorText={groupNameError}
      />
      <Autocomplete
        errorText={fundError}
        items={mappedFundsData}
        placeHolder="Select Fund"
        onSelect={handleFundSelect}
        selectedItems={selectedFunds}
        customStyle={StyledSelectBox}
        searchPlaceholder="Type to filter funds"
        onFilterChange={onFundFilterTermChanged}
        onLoadMoreItems={() => setOffsetFund(offsetFund + limit)}
      />
      <SwitchContainer>
        <SwitchLabel>Publisher Restricted Group</SwitchLabel>
        <CustomizedSwitch
          disabled={true}
          isChecked={isSwitchChecked}
          onToggle={onSwitchCheckChanged}
        />
      </SwitchContainer>
      {isSwitchChecked && (
        <Autocomplete
          errorText={publisherError}
          items={mappedPublishersData}
          customStyle={StyledSelectBox}
          placeHolder="Select Publisher"
          onSelect={handlePublisherSelect}
          selectedItems={selectedPublishers}
          onFilterChange={onPublisherFilterTermChanged}
          searchPlaceholder="Type to filter Publishers"
          onLoadMoreItems={() => setOffsetPublisher(offsetPublisher + limit)}
        />
      )}
    </RegularModal>
  );
};

const paperStyle = css`
  width: 500px;
  box-sizing: border-box;
`;

interface ActionButtonsProps {
  onSubmit: () => void;
  onCancel: () => void;
  buttonLoading: boolean;
}

const actionButtons: FC<ActionButtonsProps> = ({ buttonLoading, onSubmit, onCancel }) => {
  return (
    <ActionsContainer>
      <Button
        title="cancel"
        color="default"
        onClick={onCancel}
        variant="contained"
        style={{ height: '48px', width: '100%' }}
      />
      <StyledButton
        title="create"
        color="primary"
        onClick={onSubmit}
        variant="contained"
        isLoading={buttonLoading}
        style={{ height: '48px', width: '100%' }}
      />
    </ActionsContainer>
  );
};

const StyledButton = styled(Button)``;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  margin-top: 60px;
  gap: 0 12px;
  padding: 0 36px 36px 36px;
  & > * {
    flex-grow: 1;
  }
`;

const StyledSearch = styled(Search)`
  margin-top: 36px;
  width: 100%;
  & > div:last-child {
    height: 52px;
    padding: 16px 24px;
  }
`;

const SwitchLabel = styled.div`
  color: ${({ theme }) => theme.text.contrast.secondary};
  font-size: 16px;
`;

const SwitchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 36px;
`;

const StyledSelectBox = css`
  margin-top: 36px;
`;
