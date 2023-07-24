import React, { FC } from 'react';

import { LoadingData } from '$application/components/atoms/etc/LoadingData';
import { useGetSchemasNameQuery } from '$application/lib/generated/repoGqlTypes';

export const Sample: FC = () => {
  const [result] = useGetSchemasNameQuery();
  const { data, fetching, error } = result;

  return (
    <LoadingData loading={fetching} error={error}>
      {() => (
        <>
          <strong>Schemas:</strong>
          <ol>
            {data?.schemas.map((d, key) => (
              <li key={key}>
                {d.label.default} ( id: {d._id} ) [ isCollection: {String(d.isCollection)}{' '}
                ]
              </li>
            ))}
          </ol>
        </>
      )}
    </LoadingData>
  );
};

export default Sample;
