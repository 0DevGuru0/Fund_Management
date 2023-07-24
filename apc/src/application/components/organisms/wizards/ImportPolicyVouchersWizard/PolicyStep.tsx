import React, { FC, useEffect } from 'react';

import { useAtom } from 'jotai';
import { useUpdateAtom } from 'jotai/utils';
import Papa from 'papaparse';
import styled from 'styled-components';

import FormControl from '$application/components/atoms/etc/FormControl';
import FormLabel from '$application/components/atoms/etc/FormLabel';
import { Dropzone } from '$application/components/atoms/inputs/Dropzone';
import { Item } from '$application/components/molecules/etc/Menu';
import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';
import { useGetPolicies } from '$application/lib/generated/apcApi';
import { AddVouchersToPolicyBodyVouchersItem } from '$application/lib/generated/apcApi.schemas';
import { useGetTitleByIdsQuery } from '$application/lib/generated/repoGqlTypes';

import { errorAtom, formDataAtom } from './store';

const PolicyStep: FC = () => {
  const [formData, setFormData] = useAtom(formDataAtom);
  const setError = useUpdateAtom(errorAtom);

  const [titles] = useGetTitleByIdsQuery({
    variables: {
      ids: [formData.publisher?.id ?? ''],
    },
    pause: formData.publisher?.id === undefined,
  });

  const getPolicies = useGetPolicies({
    type: 'VOUCHER',
    skip: '0',
    limit: '100',
  });

  const policies = React.useMemo(() => {
    const p = getPolicies.data?.policies;
    if (p === null || p === undefined) {
      return [];
    }
    return p;
  }, [getPolicies.data?.policies]);

  useEffect(() => {
    const policyId = formData.policy?.id;
    if (policyId) {
      const publisherId = policies.find((p) => p.id === policyId)?.publisherId;
      if (publisherId) {
        setFormData((a) => {
          if (a.publisher) {
            a.publisher.id = publisherId;
          } else {
            a.publisher = {
              id: publisherId,
              label: '',
            };
          }
        });
      }
    }
  }, [formData.policy?.id, policies, setFormData]);

  useEffect(() => {
    if (formData.publisher?.id && !titles.fetching) {
      setFormData((a) => {
        a.publisher!.label = titles.data?.getItems?.[0].title ?? '';
      });
    }
  }, [formData.publisher?.id, setFormData, titles.data?.getItems, titles.fetching]);

  const policyItems = formData.policy ? [formData.policy] : [];
  const publisherItems = formData.publisher ? [formData.publisher] : [];

  const handleSelectPolicy = (item: string | Item) => {
    // Currently Disabled
  };

  const handleSelectPublisher = (item: string | Item) => {
    // Currently Disabled
  };

  const onPolicyFilterTermChanged = (newTerm: string) => {
    // Update elastic query (currently disabled)
  };

  const onPublisherFilterTermChanged = (newTerm: string) => {
    // Update elastic query (currently disabled)
  };

  return (
    <Container>
      <FormControl>
        <FormLabel>Policy</FormLabel>
        <Autocomplete
          disabled
          items={policyItems}
          placeHolder="Select Policy"
          selectedItems={policyItems}
          onSelect={handleSelectPolicy}
          onFilterChange={onPolicyFilterTermChanged}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Publisher</FormLabel>
        <Autocomplete
          disabled
          items={publisherItems}
          placeHolder="Select publisher"
          selectedItems={publisherItems}
          onSelect={handleSelectPublisher}
          onFilterChange={onPublisherFilterTermChanged}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Voucher list</FormLabel>
        <Dropzone
          accept="text/csv"
          maxFiles={1}
          onChange={(files) => {
            if (files.length === 1) {
              const file = files[0];
              Papa.parse<Partial<AddVouchersToPolicyBodyVouchersItem>>(file, {
                header: true,
                complete(results) {
                  const valid: AddVouchersToPolicyBodyVouchersItem[] = [];
                  results.data.map((r) => {
                    if (r.code && r.expiresAt) {
                      valid.push({
                        code: r.code,
                        expiresAt: new Date(r.expiresAt as string).toISOString(),
                        publisherId: formData.publisher?.id ?? '',
                        note: r.note,
                        usableAfter: r.usableAfter
                          ? new Date(r.usableAfter as string).toISOString()
                          : undefined,
                      });
                    }
                  });
                  setFormData((a) => {
                    a.vouchers = valid;
                  });
                  setError('');
                },
              });
            } else {
              setFormData((a) => {
                a.vouchers = [];
              });
            }
          }}
        />
      </FormControl>
    </Container>
  );
};

export default PolicyStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 92px 0 36px 0;
`;
