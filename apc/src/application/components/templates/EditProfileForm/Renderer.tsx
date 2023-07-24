import React from 'react';

import styled from 'styled-components';

import Input from '$application/components/atoms/etc/Input';
import { Config } from '$application/components/templates/EditProfileForm';

interface RendererProps {
  config: Record<string, Config>;
  errors: Record<string, string>;
}
export const Renderer = ({ config, errors }: RendererProps) => {
  return (
    <MainWrapper>
      {Object.entries(config).map(([label, conf]) => {
        const RendererCmp = conf?.renderer ?? StyledInput;

        return (
          <Wrapper key={label} $fullWidth={conf.fullWidth ?? false}>
            {conf.renderLabel && (
              <Label>
                {label}
                {conf.optional && <Tag>(Optional)</Tag>}
              </Label>
            )}
            <RendererCmp
              value=""
              onChange={() => null}
              {...(conf.props ?? {})}
              errorText={errors[conf.name]}
            />
          </Wrapper>
        );
      })}
    </MainWrapper>
  );
};
const StyledInput = styled(({ $width, ...props }) => <Input {...props} />)`
  width: ${({ $width }) => $width ?? '369px'};
`;
const Tag = styled.div`
  display: inline-block;
  margin-left: 3px;
  font-size: 12px;
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const Label = styled.div`
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.grey[800]};
`;

const Wrapper = styled.div<{ $fullWidth: boolean }>`
  width: ${({ $fullWidth }) => ($fullWidth ? 100 : 50)}%;
  margin-bottom: 36px;
`;

const MainWrapper = styled.div`
  display: flex;
  width: 774px;
  flex-wrap: wrap;
`;

export default Renderer;
