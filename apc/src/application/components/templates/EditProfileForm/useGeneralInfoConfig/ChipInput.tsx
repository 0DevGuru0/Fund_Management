import React from 'react';

import styled from 'styled-components';

import CustomChipInput from '$application/components/atoms/inputs/CustomChipInput';

interface ChipInputProps {
  width?: number;
  onAdd: (val: string) => void;
  onDelete: (val: string) => void;
  title?: string;
  iconButtonProps: {
    tooltipTitle: string;
    disabledText: string;
  };
  addTagInBottom: boolean;
}
export const ChipInput = ({
  title,
  width,
  iconButtonProps,
  addTagInBottom,
}: ChipInputProps) => {
  return (
    <Wrapper $width={width}>
      <CustomChipInput
        title={title}
        addTagInBottom={addTagInBottom}
        iconButtonProps={iconButtonProps}
      />
    </Wrapper>
  );
};
interface IWrapper {
  $width?: number;
}

const Wrapper = styled.div<IWrapper>`
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  position: relative;
`;

export default ChipInput;
