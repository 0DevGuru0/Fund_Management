import React, { FC } from 'react';

import { useUpdateAtom } from 'jotai/utils';
import styled from 'styled-components';

import NoDocumentsSVG from '$application/assets/colored-icons/NoDocumentsSVG.svg';
import { Button } from '$application/components/atoms/buttons/Button';
import EmptyContentHolder from '$application/components/molecules/etc/EmptyContentHolder';

import { messageTemplateWizard } from './store';

export const NoMessageTemplates: FC = () => {
  const setWizardStatus = useUpdateAtom(messageTemplateWizard);

  return (
    <Container>
      <EmptyContentHolder
        icon={<NoDocuments />}
        title="No Message Templates Found"
        description="There is no message templates available right now. You can add one manually."
        actionButton={
          <Button
            title="Add a New One"
            color="primary"
            onClick={() =>
              setWizardStatus({ openWizard: true, openDeleteModal: false, messageId: '' })
            }
            leftIcon="plus"
            customSize="lg"
            variant="outlined"
          />
        }
      />
    </Container>
  );
};

export default NoMessageTemplates;

const Container = styled.div`
  flex: 1;
`;

const NoDocuments = styled(NoDocumentsSVG)`
  width: 465px;
  height: 200px;
  flex: 1;
`;
