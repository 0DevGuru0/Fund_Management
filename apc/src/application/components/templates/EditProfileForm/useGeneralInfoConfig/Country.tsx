import React, { useState } from 'react';

import i18nCountries from 'i18n-iso-countries';
import enLocals from 'i18n-iso-countries/langs/en.json';
import { css } from 'styled-components';

import Autocomplete from '$application/components/organisms/inputs/Autocomplete';

i18nCountries.registerLocale(enLocals);
const countriesArray = Object.values(
  i18nCountries.getNames('en', { select: 'official' }),
);
export const Country = (props) => {
  const [countries, setCountries] = useState(countriesArray);
  const filterChangeHandler = (newTerm: string) => {
    if (newTerm === '') return setCountries(countriesArray);

    setCountries((prevState) =>
      prevState.filter((country) => country.match(new RegExp(newTerm, 'i'))),
    );
  };
  return (
    <Autocomplete
      isOptional
      items={countries}
      customStyle={css`
        width: 369px;
        & > div:first-child {
          background-color: ${({ theme }) => theme.palette.grey[200]};
          border-color: ${({ theme }) => theme.palette.grey[200]};
          :hover {
            background-color: #fff;
            border-color: ${({ theme }) => theme.palette.secondary};
          }
        }
      `}
      onFilterChange={filterChangeHandler}
      {...props}
    />
  );
};

export default Country;
