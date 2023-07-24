import React, { ChangeEventHandler, FC, RefObject } from 'react';

import styled from 'styled-components';

import { AutocompleteProps } from '../Autocomplete';

export type SearchInputProps = Pick<AutocompleteProps, 'icon' | 'searchPlaceholder'> & {
  searchTerm: string;
  rendererRef: RefObject<HTMLInputElement>;
  onChangeSearchTerm: ChangeEventHandler<HTMLInputElement>;
};

export const SearchInput: FC<SearchInputProps> = ({
  icon,
  searchTerm,
  rendererRef,
  searchPlaceholder,
  onChangeSearchTerm,
}) => {
  return (
    <SearchBox
      $hasIcon={!!icon}
      ref={rendererRef}
      value={searchTerm}
      onChange={onChangeSearchTerm}
      placeholder={searchPlaceholder || 'Type to search ...'}
    />
  );
};

export default SearchInput;

interface TextProps {
  $hasIcon?: boolean;
}

const SearchBox = styled.input<TextProps>`
  margin: auto;
  border: none;
  outline: none;
  font-size: 16px;
  overflow: hidden;
  background-color: inherit;
  line-height: 20px;
  margin-right: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: calc(100% - 50px);
  color: ${({ theme }) => theme.text.hightContrast};
  margin-left: ${({ $hasIcon }) => ($hasIcon ? 6 : 10)}px;
  ::placeholder {
    color: ${({ theme }) => theme.palette.grey[600]};
  }
`;
