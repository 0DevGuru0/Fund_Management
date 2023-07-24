/* eslint-disable no-console */
import React, { FC, useEffect, useState } from 'react';

import { useAtom } from 'jotai';
import { useAtomValue, useResetAtom, useUpdateAtom } from 'jotai/utils';
import { isEmpty, keys, pickBy, values } from 'lodash';
import styled from 'styled-components';
import { v4 as uuid } from 'uuid';

import { GaugeChart } from '$application/components/molecules/charts/GaugeChart';
import { GaugeChartData } from '$application/components/molecules/charts/GaugeChart/dataProcess';
import SelectedRowCard from '$application/components/organisms/tables/Table/SelectedRowCard';
// import JournalsControl from '$application/components/pages/Journals/JournalsList/JournalsControl';
import { filterQueryBuilder } from '$application/components/templates/JournalsTable/filterQueryBuilder';
import { journalApiToJournalTableItem } from '$application/components/templates/JournalsTable/journalApiToJournalTableItem';
import JournalsTable from '$application/components/templates/JournalsTable/JournalsTable';
import {
  IJournalsContextSelectable,
  JournalsContextSelectable,
} from '$application/components/templates/JournalsTable/JournalsTableContext';
import { useGetJournalGroups } from '$application/lib/generated/apcApi';
import { useGetJournalQuery } from '$application/lib/generated/repoGqlTypes';

// import NoJournals from './JournalsList/NoJournals';
import {
  currentPageAtom,
  sortOptionAtom,
  filterOptionsAtom,
  selectedRowsAtom,
  selectAllAtom,
  queryVariablesAtom,
  filterCardOpenAtom,
} from './JournalsList/store';
import JournalsModals from './JournalsModals';
import { journalsCountAtom } from './store';

const limit = 50;

interface JournalsListProps {
  gaugeChartData: GaugeChartData;
}

export interface JournalGroupItem {
  id: string;
  title: string;
  description: string;
}

export const JournalsList: FC<JournalsListProps> = ({ gaugeChartData }) => {
  const sortOption = useAtomValue(sortOptionAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const selectedRows = useAtomValue(selectedRowsAtom);
  const filterOptions = useAtomValue(filterOptionsAtom);
  const setJournalsCount = useUpdateAtom(journalsCountAtom);
  const [showBottomCard, setShowBottomCard] = useState(false);
  const [queryVariables, setQueryVariables] = useAtom(queryVariablesAtom);
  const resetQueryVariables = useResetAtom(queryVariablesAtom);

  const { query, sort } = queryVariables;
  const selectedJournalIds = selectedRows ? keys(pickBy(selectedRows)) : [];

  // Show the SelectedRow card in case any of the table items clicked
  useEffect(() => {
    if (selectedRows) {
      setShowBottomCard(values(selectedRows).filter(Boolean).length > 0);
    }
  }, [selectedRows]);

  const offset = (currentPage - 1) * limit;
  const [{ data, fetching, error }] = useGetJournalQuery({
    pause: isEmpty(query),
    variables: {
      sort,
      query,
      limit,
      offset,
    },
  });

  const totalItems = data?.search.total || 0;
  const journalItems = data?.search.items?.flatMap((item) =>
    item.__typename === 'Journal' ? item : [],
  );

  useEffect(() => {
    const filter = filterQueryBuilder(limit, offset, sortOption, filterOptions);
    setQueryVariables(filter);
  }, [sortOption, filterOptions, offset, setQueryVariables]);

  useEffect(() => {
    setJournalsCount(totalItems);
  }, [setJournalsCount, totalItems]);

  useEffect(() => {
    resetQueryVariables();
  }, []);

  const { data: journalGroups } = useGetJournalGroups();
  const journalGroupsList: JournalGroupItem[] | undefined = journalGroups?.map(
    (group) => {
      return {
        id: group?.id || uuid(),
        title: group?.title || 'N/A',
        // TODO: we need a better description here
        description: `${group?.publisherId}` || 'No description',
      };
    },
  );

  const initJournals: IJournalsContextSelectable = {
    totalItems,
    selectAllAtom,
    sortOptionAtom,
    currentPageAtom,
    pageSize: limit,
    selectedRowsAtom,
    filterOptionsAtom,
    hasError: !!error,
    filterCardOpenAtom,
    isLoading: fetching,
  };

  // if (
  //   !fetching &&
  //   isEmpty(data?.search.items) &&
  //   isUndefined(filterOptions.searchPhrase)
  // ) {
  //   return <NoJournals />;
  // }

  return (
    <Container>
      <UpperContainer>
        <JournalChartContainer>
          <GaugeChart items={gaugeChartData} />
        </JournalChartContainer>
        {/* <JournalsControl /> */}
      </UpperContainer>
      <JournalsContextSelectable.Provider value={initJournals}>
        <JournalsTable
          selectableRows
          tableItems={journalApiToJournalTableItem(journalItems ?? [])}
        />
      </JournalsContextSelectable.Provider>
      <JournalsModals
        journalGroupsList={journalGroupsList}
        selectedJournals={selectedJournalIds}
      />
      {showBottomCard && (
        <SelectedRowCard showGroupButton groupExists={!!journalGroupsList} />
      )}
    </Container>
  );
};

export default JournalsList;

const Container = styled.div`
  padding: 48px 36px;
  padding-bottom: 0px;
`;

const UpperContainer = styled.div`
  display: flex;
  margin-bottom: 36px;
`;

const JournalChartContainer = styled.div`
  flex: 1;
`;
