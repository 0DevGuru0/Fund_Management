import React, { FC, useEffect, useMemo } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue, useResetAtom } from 'jotai/utils';
import { isEmpty, keyBy } from 'lodash';
import { useQueryClient } from 'react-query';
import styled from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { GaugeChartData } from '$application/components/molecules/charts/GaugeChart/dataProcess';
import { CreateGroupModal } from '$application/components/molecules/modals/CreateGroupModal';
import {
  getGetJournalGroupsQueryKey,
  useGetJournalGroups,
} from '$application/lib/generated/apcApi';
import { useGetTitleByIdsQuery } from '$application/lib/generated/repoGqlTypes';

import { journalGroupsApiToCards } from './JournalsGroup/journalGroupsApiToCards';
import JournalGroupsCards from './JournalsGroup/JournalGroupsCards';
import JournalGroupsControl from './JournalsGroup/JournalGroupsControl';
import JournalGroupsFilter from './JournalsGroup/JournalGroupsFilter';
import { filteredDataProcess } from './JournalsGroup/JournalGroupsFilter/utils';
import NoJournalGroups from './JournalsGroup/NoJournalGroups';
import { filterOptionsAtom, groupsSortOptionAtom, showCreateGroupAtom } from './store';

interface JournalsGroupProps {
  gaugeChartData: GaugeChartData;
}

export const JournalsGroup: FC<JournalsGroupProps> = ({ gaugeChartData }) => {
  const queryClient = useQueryClient();
  const sortOption = useAtomValue(groupsSortOptionAtom);
  const filterOptions = useAtomValue(filterOptionsAtom);
  const resetFilterOptions = useResetAtom(filterOptionsAtom);
  const [showCreateGroup, setShowCreateGroup] = useAtom(showCreateGroupAtom);

  const { data: journalGroups, error, isFetching } = useGetJournalGroups();

  useEffect(() => {
    resetFilterOptions();
  }, []);

  const ids = useMemo(() => journalGroups?.map((jg) => jg.publisherId) ?? [], [
    journalGroups,
  ]);
  const [titles] = useGetTitleByIdsQuery({
    variables: {
      ids,
    },
  });

  const titlesMap = useMemo(() => keyBy(titles.data?.getItems ?? [], 'id'), [
    titles.data,
  ]);

  const groupExists = !isEmpty(journalGroups);

  const groupCards = journalGroups
    ? journalGroupsApiToCards(journalGroups, titlesMap)
    : [];
  const filteredCards = filteredDataProcess(sortOption, filterOptions, groupCards);

  const handleCreateGroup = (result: any) => {
    // TODO: we may need to add some snackbar to show response to user
    // eslint-disable-next-line no-console
    console.log(`A new group is submitted: ${result})`);
    setShowCreateGroup(false);
    queryClient.refetchQueries(getGetJournalGroupsQueryKey(), { active: true });
  };

  return (
    <LoadingData error={error} loading={isFetching}>
      {() => (
        <JournalGroupsContainer>
          {!groupExists ? (
            <NoJournalGroups />
          ) : (
            <>
              <JournalGroupsControl
                journalGroups={journalGroups}
                gaugeChartData={gaugeChartData}
              />
              <JournalGroupsFilter />
              <JournalGroupsCards cards={filteredCards} />
            </>
          )}
          <CreateGroupModal
            open={showCreateGroup}
            onSubmit={handleCreateGroup}
            onClose={() => setShowCreateGroup(false)}
            onCancel={() => setShowCreateGroup(false)}
          />
        </JournalGroupsContainer>
      )}
    </LoadingData>
  );
};

export default JournalsGroup;

const JournalGroupsContainer = styled.div`
  padding: 48px 36px;
`;
