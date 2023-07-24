import { useState, useEffect } from 'react';

import { ServiceStatus } from '$application/components/atoms/etc/Message';

type IMockRequest = <T extends any = any>(
  address: string,
) => {
  data: T;
  error?: Error;
  status: ServiceStatus;
};

export interface ServiceProps {
  address: string;
}

// TODO: we will need a caching strategy for this
export const useMockRequest: IMockRequest = (address) => {
  const [status, setStatus] = useState(ServiceStatus.Idle);
  const [error, setError] = useState<Error>();
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setStatus(ServiceStatus.Loading);

    fetch(address)
      .then(async (res) => {
        if (!res.ok) throw new Error(res.statusText);
        const parsedResult = await res.json();
        setStatus(ServiceStatus.Success);
        setData(parsedResult.results);
      })
      .catch((err) => {
        setStatus(ServiceStatus.Error);
        setError(err);
      });
  }, [address]);

  return {
    status,
    data,
    error,
  };
};
