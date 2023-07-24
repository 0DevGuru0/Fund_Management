/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue } from 'jotai/utils';
import { isEmpty, debounce, DebouncedFunc } from 'lodash';
import { NextPage } from 'next';
import styled from 'styled-components';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import JournalsTable from '$application/components/templates/JournalsTable/JournalsTable';
import {
  IJournalsContextNonSelectable,
  JournalsContextNonSelectable,
} from '$application/components/templates/JournalsTable/JournalsTableContext';
import {
  useGetJournalGroups,
  useGetJournalsOfJournalGroup,
} from '$application/lib/generated/apcApi';

import JournalGroupChart from './JournalGroupDetails/JournalGroupChart';
import JournalGroupControl from './JournalGroupDetails/JournalGroupControl';
import { journalsOfJournalGroupApiToJournalTableItem } from './JournalGroupDetails/journalsOfJournalGroupApiToJournalTableItem';
import {
  currentPageAtom,
  sortOptionAtom,
  filterOptionsAtom,
  journalsCountAtom,
  filterCardOpenAtom,
} from './JournalGroupDetails/store';

export interface PageProps {
  pageLayout: 'Management' | 'Researcher';
  journalGroupId: string;
}

const limit = 10;

const JournalGroupDetails: NextPage<PageProps> = ({ journalGroupId }) => {
  const currentPage = useAtomValue(currentPageAtom);
  const filterOptions = useAtomValue(filterOptionsAtom);
  const debounceRef = useRef<DebouncedFunc<() => void>>();
  const [searchPhrase, setSearchPhrase] = useState<string>('');
  const [totalItems, setTotalItems] = useAtom(journalsCountAtom);

  const {
    data: journalsDetail,
    error: errorGetJournals,
    isFetching: loadingGetJournals,
  } = useGetJournalsOfJournalGroup(journalGroupId, {
    title: searchPhrase,
    limit: limit.toString(),
    skip: ((currentPage - 1) * limit).toString(),
  });

  const {
    data: journalGroups,
    error: errorGetGroupInfo,
    isLoading: loadingGetGroupInfo,
  } = useGetJournalGroups();
  // TODO: [IW-604] We need an API to get journal groups by ID
  const currentGroup = journalGroups?.find(({ id }) => id === journalGroupId);

  // TODO: Fix this when journal groups had isActive
  const journalGroupStatus = 'Active' ?? 'Unknown';
  const journalGroupName = currentGroup?.title || 'N/A';

  const journalsCount = journalsDetail?.count ?? 0;

  // TODO: We should calculate active and suspended count
  const suspendedCount = 0;
  const activeCount = journalsCount;

  const delayedFilterChange = () => {
    let searchTerm = filterOptions.searchPhrase || '';
    if (searchTerm.trim() === '' || searchTerm.length < 3) {
      searchTerm = '';
    }
    const newSubmission = debounce(setSearchPhrase, 800);
    debounceRef.current = newSubmission;
    newSubmission(searchTerm);
  };

  useEffect(() => {
    delayedFilterChange();
  }, [filterOptions]);

  const journals = journalsDetail?.journals
    ? journalsOfJournalGroupApiToJournalTableItem(journalsDetail.journals)
    : [];

  useEffect(() => {
    setTotalItems(isEmpty(searchPhrase) ? journalsCount : journals.length);
  }, [setTotalItems, journals]);

  const initJournals: IJournalsContextNonSelectable = {
    totalItems,
    sortOptionAtom,
    pageSize: limit,
    currentPageAtom,
    filterOptionsAtom,
    filterCardOpenAtom,
    hasError: !!errorGetJournals || !!errorGetGroupInfo,
    isLoading: loadingGetJournals || loadingGetGroupInfo,
  };

  return (
    <LoadingData
      error={errorGetJournals}
      loading={loadingGetJournals && isEmpty(filterOptions)}
    >
      {() => (
        <>
          <Container>
            <JournalGroupControl
              status={journalGroupStatus}
              journalGroupName={journalGroupName}
            />
            <JournalGroupChart
              activeCount={activeCount}
              suspendedCount={suspendedCount}
            />
            <JournalsContextNonSelectable.Provider value={initJournals}>
              <JournalsTable tableItems={journals} />
            </JournalsContextNonSelectable.Provider>
          </Container>
        </>
      )}
    </LoadingData>
  );
};

export default JournalGroupDetails;

const Container = styled.div`
  padding: 24px 36px;
`;
