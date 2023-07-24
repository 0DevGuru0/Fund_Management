import React from 'react';

import { Alert } from '@material-ui/lab';
import { useAtomValue } from 'jotai/utils';
import styled from 'styled-components';

import { formDataAtom, errorAtom } from './/store';

const PreviewStep = () => {
  const formData = useAtomValue(formDataAtom);
  const error = useAtomValue(errorAtom);

  return (
    <Container>
      {error && <Alert severity="error">{error}</Alert>}

      <Table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Start Date</th>
            <th>Expiry Date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {formData.vouchers.map((v) => (
            <tr key={v.code}>
              <td>{v.code}</td>
              <td>{v.usableAfter}</td>
              <td>{v.expiresAt}</td>
              <td>{v.note}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 92px 0 36px 0;
`;

const Table = styled.table`
  border-radius: 12px;
  width: 100%;
  border-collapse: collapse;
  background-color: ${({ theme }) => theme.background.primary};

  th,
  td {
    padding: 24px;
    border: 1px solid ${({ theme }) => theme.palette.primaryLight};
  }

  thead {
    background-color: ${({ theme }) => theme.background.secondary};
    color: ${({ theme }) => theme.link.text};
    text-align: left;
    font-size: 12px;
    line-height: 1.33;
  }
`;

export default PreviewStep;
