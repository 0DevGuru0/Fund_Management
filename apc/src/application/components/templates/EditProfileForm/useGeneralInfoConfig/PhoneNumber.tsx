import React from 'react';

import PhoneInput from 'react-phone-input-2';
import styled from 'styled-components';
import 'react-phone-input-2/lib/style.css';

export const PhoneNumber = (props) => {
  return (
    <Wrapper>
      <PhoneInput
        {...props}
        isSelect={true}
        specialLabel={''}
        helperText={props.error && props.errorText}
        autoFormat={false}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: min-content;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  border-radius: 8px;
  padding: 2px;
  :hover {
    padding: 1px;
    border: 1px solid ${({ theme }) => theme.palette.secondary};
    background-color: #fff;
  }
  :focus-within {
    box-shadow: inset 0 0 0 1px #43cfcf, 0 0 0 3px rgba(192, 239, 239, 0.3);
    background-color: #fff;
    :hover {
      border: unset;
      padding: 2px;
    }
  }
  && {
    input {
      width: 369px;
      height: 52px;
      border: unset;
      background-color: unset;
    }
    .flag-dropdown {
      background-color: unset;
      border: unset;
    }

    .country-list {
      width: 369px;
      max-height: 300px;
      box-sizing: border-box;
      .country {
        padding: 12px 9px 13px 12px;
        :hover {
          background-color: ${({ theme }) => theme.palette.primaryLight};
        }
        &.highlight {
          background-color: ${({ theme }) => theme.palette.primaryLight};
        }
      }
    }
  }
`;
export default PhoneNumber;
