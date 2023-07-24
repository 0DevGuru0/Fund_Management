import React from 'react';

import { useAtom } from 'jotai';
import styled from 'styled-components';

import FormControl from '$application/components/atoms/etc/FormControl';
import FormLabel from '$application/components/atoms/etc/FormLabel';
import Input from '$application/components/atoms/etc/Input';
import CustomizedSwitch from '$application/components/molecules/modals/CreateGroupModal/CustomizedSwitch';
import {
  UpsertMessageTemplateBodyChannelsItem,
  UpsertMessageTemplateBodyChannelsItemAllOfOneOf,
  UpsertMessageTemplateBodyChannelsItemAllOfSix,
} from '$application/lib/generated/apcApi.schemas';

import { formDataAtom } from '../store';

const isEmailChannel = (
  channel: UpsertMessageTemplateBodyChannelsItem,
): channel is UpsertMessageTemplateBodyChannelsItemAllOfOneOf &
  UpsertMessageTemplateBodyChannelsItemAllOfSix => channel.type === 'email';

const initialEmailConfig: UpsertMessageTemplateBodyChannelsItemAllOfOneOf &
  UpsertMessageTemplateBodyChannelsItemAllOfSix = {
  type: 'email',
  from: '',
  isActive: true,
  subject: '',
  bcc: [],
  cc: [],
  title: '',
};

const configs = [
  {
    label: 'Subject',
    name: 'subject',
    optional: false,
  },
  {
    label: 'From',
    name: 'from',
    optional: false,
  },
  {
    label: 'cc',
    placeHolder: '{{email.cc}} iinmanagers@iingroups.com',
    name: 'cc',
    optional: true,
  },
  {
    label: 'bcc',
    name: 'bcc',
    placeHolder: 'support.smartfund.iknito.com',
    optional: true,
  },
];

export const EmailConfiguration = () => {
  const [formData, setFormData] = useAtom(formDataAtom);

  const onSwitchCheckChange = () => {
    setFormData((a) => {
      if (!a.channels[0]) {
        a.channels[0] = {
          ...initialEmailConfig,
          isActive: true,
        };
      } else {
        if (isEmailChannel(a.channels[0])) {
          a.channels[0].isActive = !a.channels[0].isActive;
        }
      }
    });
  };
  const isEnable =
    formData.channels[0] && isEmailChannel(formData.channels[0])
      ? formData.channels[0].isActive
      : false;
  return (
    <Wrapper>
      <Header>
        <Title>Email Configuration</Title>
        <CustomizedSwitch isChecked={isEnable} onToggle={onSwitchCheckChange} />
      </Header>
      {configs.map((config, idx) => (
        <StyledFormControl key={idx}>
          <LabelWrapper>
            <FormLabel>{config.label}</FormLabel>
            {config.optional && <OptionalFlag>(optional)</OptionalFlag>}
          </LabelWrapper>
          <Input
            disabled={!isEnable}
            placeholder={config.placeHolder}
            onChange={(val) => {
              setFormData((a) => {
                if (!a.channels[0]) {
                  a.channels[0] = {
                    ...initialEmailConfig,
                    [config.name]: val,
                  };
                } else {
                  if (isEmailChannel(a.channels[0])) {
                    a.channels[0][config.name] = val;
                  }
                }
              });
            }}
            value={
              formData.channels[0] && isEmailChannel(formData.channels[0])
                ? formData.channels[0][config.name]
                : ''
            }
          />
        </StyledFormControl>
      ))}
    </Wrapper>
  );
};

const StyledFormControl = styled(FormControl)`
  margin-bottom: 36px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const Wrapper = styled.div`
  width: 633px;
  margin: 24px 0 0;
  box-sizing: border-box;
  padding: 23px 24px 24px;
  border-radius: 8px;
  border: solid 1px ${({ theme }) => theme.palette.grey[500]};
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.grey[700]};
`;

const OptionalFlag = styled.span`
  align-self: end;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default EmailConfiguration;
