import React from 'react';

import { TextField, InputAdornment } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import styled from 'styled-components';

import SearchSVG from '$application/assets/icons/search.svg';
import { useGetHelpItemsQuery } from '$application/lib/generated/repoGqlTypes';

import { Help } from './LeftContainer/Item';
import { selectedAtom } from './LeftContainer/store';
import { helpAtom, searchAtom } from './store';

const DocsHeader = () => {
  const setHelp = useUpdateAtom(helpAtom);
  const setSelected = useUpdateAtom(selectedAtom);
  const [search, setSearch] = useAtom(searchAtom);
  const [{ data }] = useGetHelpItemsQuery({
    pause: search.length < 3,
    variables: {
      query: {
        bool: {
          must: [
            { match: { schema: 'Help' } },
            {
              bool: {
                should: [{ match: { title: search } }, { match: { tags: search } }],
              },
            },
          ],
        },
      },
      sort: {
        'Help.order': { order: 'asc' },
      },
    },
  });

  return (
    <Container>
      <MainText>How can we help?</MainText>
      <InfoText>
        You can browse the topics below for a quick overview of the different features of
        the application.
      </InfoText>
      <SearchWrapper>
        <Autocomplete
          freeSolo
          getOptionLabel={(help) => help.label}
          onChange={(e, v) => {
            if (v) {
              const h = v as Help;
              setHelp(h);
              setSelected(h.id);
            }
          }}
          onInputChange={(e, v) => setSearch(v)}
          options={(data?.search.items ?? []) as Help[]}
          renderInput={(params) => (
            <ExtendedSearch
              {...params}
              value={search}
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchSVG />
                  </InputAdornment>
                ),
              }}
              color="secondary"
              placeholder="Type keywords to find answers"
              margin="normal"
              variant="outlined"
            />
          )}
        />
      </SearchWrapper>
    </Container>
  );
};

export default DocsHeader;

const Container = styled.div`
  padding: 72px 0;
  margin-top: 84px;
  max-height: 272px;
  text-align: center;
  background-color: ${({ theme }) => theme.palette.grey[400]};
`;

const MainText = styled.div`
  font-size: 20px;
  font-weight: bold;
  line-height: 24px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.text.contrast.secondary};
`;

const InfoText = styled.div`
  font-size: 16px;
  margin-bottom: 24px;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const SearchWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExtendedSearch = styled(TextField)`
  width: 760px;
  background-color: ${({ theme }) => theme.background.primary};
  border-radius: 8px;

  .MuiOutlinedInput-root,
  .MuiOutlinedInput-root:focus,
  .MuiOutlinedInput-root:hover {
    border-radius: 8px;
    border: 1px solid transparent;
  }
  .MuiOutlinedInput-root,
  .MuiOutlinedInput-root:focus,
  .MuiOutlinedInput-root:hover {
    border-radius: 8px;
    border: 1px solid transparent;
  }

  .MuiOutlinedInput-root > fieldset.MuiOutlinedInput-notchedOutline {
    border-width: 1px;
    border-color: ${({ theme }) => theme.palette.grey[600]};
  }

  .MuiOutlinedInput-root:hover > fieldset.MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-root:focus > fieldset.MuiOutlinedInput-notchedOutline {
    border-width: 1px;
    border-color: ${({ theme }) => theme.palette.secondary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.text.contrast.primary};
  }

  svg path {
    width: 20px;
    height: 20px;
    stroke: ${({ theme }) => theme.text.lowContrast};
    fill: ${({ theme }) => theme.text.lowContrast};
  }
`;
