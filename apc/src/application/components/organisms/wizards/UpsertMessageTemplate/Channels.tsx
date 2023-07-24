import React, { useState } from 'react';

import styled from 'styled-components';

// import FillBellSVG from '$application/assets/icons/bell-fill.svg';
// import BellSVG from '$application/assets/icons/bell.svg';
import FillMailSVG from '$application/assets/icons/mail-fill.svg';
import MailSVG from '$application/assets/icons/mail.svg';
// import FillHttpsSVG from '$application/assets/icons/https-fill.svg';
// import HttpsSVG from '$application/assets/icons/https.svg';
// import FillMessageSVG from '$application/assets/icons/message-circle-fill.svg';
// import MessageSVG from '$application/assets/icons/message-circle.svg';
// import FillTeamsSVG from '$application/assets/icons/microsoft-teams-fill.svg';
// import TeamsSVG from '$application/assets/icons/microsoft-teams.svg';
// import FillTelegramSVG from '$application/assets/icons/telegram-fill.svg';
// import TelegramSVG from '$application/assets/icons/telegram.svg';
// import FillWhatsappSVG from '$application/assets/icons/whatsapp-fill.svg';
// import WhatsappSVG from '$application/assets/icons/whatsapp.svg';
import SquareButton from '$application/components/atoms/buttons/SquareButton';
import FormControl from '$application/components/atoms/etc/FormControl';
import FormLabel from '$application/components/atoms/etc/FormLabel';

import EmailConfiguration from './Channels/EmailConfiguration';

interface IForm {
  type: 'email' | 'notification';
  disabled: boolean;
  icons: {
    default: React.ReactNode;
    filled: React.ReactNode;
  };
}

const formTypes: IForm[] = [
  {
    type: 'email',
    disabled: false,
    icons: {
      default: <MailSVG />,
      filled: <FillMailSVG />,
    },
  },
  // {
  //   type: 'notification',
  //   disabled: false,
  //   icons: {
  //     default: <BellSVG />,
  //     filled: <FillBellSVG />,
  //   },
  // },
  // {
  //   type: 'SMS',
  //   disabled: false,
  //   icons: {
  //     default: <MessageSVG />,
  //     filled: <FillMessageSVG />,
  //   },
  // },
  // {
  //   type: 'Telegram',
  //   disabled: true,
  //   icons: {
  //     default: <TelegramSVG />,
  //     filled: <FillTelegramSVG />,
  //   },
  // },
  // {
  //   type: 'Whatsapp',
  //   disabled: true,
  //   icons: {
  //     default: <WhatsappSVG />,
  //     filled: <FillWhatsappSVG />,
  //   },
  // },
  // {
  //   type: 'Teams',
  //   disabled: true,
  //   icons: {
  //     default: <TeamsSVG />,
  //     filled: <FillTeamsSVG />,
  //   },
  // },
  // {
  //   type: 'HTTPS',
  //   disabled: true,
  //   icons: {
  //     default: <HttpsSVG />,
  //     filled: <FillHttpsSVG />,
  //   },
  // },
];

const formConfig = (formDataType: 'email' | 'notification') => {
  return <EmailConfiguration />;
  // switch (formDataType) {
  //   case 'email':
  //     return <EmailConfiguration />;
  //   case 'notification':
  //     return <>Nothing has been implemented yet</>;
  // }
};

export const Channels = () => {
  const [selectedForm, setSelectedForm] = useState<'email' | 'notification'>('email');

  return (
    <>
      <SubTitle>
        Each template can be configured to send messages to multiple channels
        simultaneously. Each channel can be enabled/disabled using the toggle button on
        the right hand side.
      </SubTitle>
      <Container>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <TypeContainer>
            {formTypes.map((formType, idx) => (
              <StyledSquareButton
                disabled={formType.disabled}
                key={idx}
                tooltipTitle={formType.type}
                isSelected={selectedForm === formType.type}
                icon={formType.icons.default}
                fillIcon={formType.icons.filled}
                height="48px"
                width="48px"
                handleClick={() => setSelectedForm(formType.type)}
              />
            ))}
          </TypeContainer>
        </FormControl>
        {formConfig(selectedForm)}
      </Container>
    </>
  );
};

const Container = styled.div`
  margin-top: 44px;
`;
const TypeContainer = styled.div`
  display: flex;
`;

const SubTitle = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.palette.grey[700]};
`;
const StyledSquareButton = styled(SquareButton)`
  :not(:last-child) {
    margin-right: 12px;
  }
`;
export default Channels;
