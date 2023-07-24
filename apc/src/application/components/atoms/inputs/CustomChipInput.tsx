import React, { FC } from 'react';

import { ChipInput, IChipInput } from '@iin/pubnito-components';
import styled from 'styled-components';

const CustomChipInput: FC<IChipInput> = (props) => {
  return (
    <Wrapper hasTitle={props.title ? true : false}>
      <ChipInput {...props} />
    </Wrapper>
  );
};

interface IWrapper {
  hasTitle: boolean;
}

const Wrapper = styled.div<IWrapper>`
  font-family: inherit;

  .MuiChip-root {
    background-color: ${({ theme }) => theme.palette.grey[400]};

    span {
      color: ${({ theme }) => theme.palette.grey[800]};
    }

    button {
      background-color: inherit;
      color: ${({ theme }) => theme.palette.grey[600]};
      width: 25px;
    }
  }

  > div {
    h5 {
      font-size: 16px;
      font-weight: 600;
      color: ${({ theme }) => theme.text.contrast.secondary};
    }

    &:focus {
      h5 {
        color: ${({ theme }) => theme.palette.grey[800]};
      }
    }

    > div {
      width: initial !important;
      max-width: initial !important;
      height: initial !important;

      &:nth-child(${({ hasTitle }) => (hasTitle ? 2 : 1)}) {
        background-color: ${({ theme }) => theme.background.secondary};
        border: none;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;

        .MuiInputBase-root {
          button {
            background-color: ${({ theme }) => theme.cmp.button.secondary};

            &:hover {
              background-color: ${({ theme }) => theme.palette.secondary};

              > svg {
                & path,
                & use {
                  fill: ${({ theme }) => theme.palette.grey[100]} !important;
                }
              }
            }
          }
        }

        input {
          border: none;
        }

        &:hover {
          background-color: ${({ theme }) => theme.palette.grey[100]};
          border: solid 1px ${({ theme }) => theme.cmp.input.border};
        }
      }
    }
  }
`;

export default CustomChipInput;
