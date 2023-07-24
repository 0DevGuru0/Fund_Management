/* eslint-disable max-lines */
// TODO: This component needs refactor
import React, { useState } from 'react';

import { Textarea } from '@iin/pubnito-components';
import esb from 'elastic-builder';
import { useAtom } from 'jotai';
import { isEmpty, remove } from 'lodash';
import styled from 'styled-components';

import CreditCardSVG from '$application/assets/icons/credit-card-fill.svg';
import TicketSVG from '$application/assets/icons/ticket.svg';
import SquareButton from '$application/components/atoms/buttons/SquareButton';
import FormControl from '$application/components/atoms/etc/FormControl';
import FormLabel from '$application/components/atoms/etc/FormLabel';
import Input from '$application/components/atoms/etc/Input';
import { Item } from '$application/components/molecules/etc/Menu';
import { Autocomplete } from '$application/components/organisms/inputs/Autocomplete';
import { useUserInfo } from '$application/lib/auth/useUserInfo';
import { useGetJournalGroups } from '$application/lib/generated/apcApi';
import {
  useGetFundersQuery,
  useGetPublishersNameQuery,
} from '$application/lib/generated/repoGqlTypes';

import { fundQueryByTerm } from './DetailStep/filterQueryBuilder';
import itemsMapper from './DetailStep/itemsMapper';
import { formDataAtom } from './store';

const limit = 10;

const fundInitQuery = (funds?: string[]): esb.BoolQuery => {
  const result = esb
    .boolQuery()
    .must(esb.matchQuery('schema.keyword', 'Organization'))
    .filter(esb.termQuery('Organization.type.keyword', 'Fund'));
  if (funds) {
    result.must(esb.termsQuery('_id', funds));
  }
  return result;
};

const publisherInitQuery = esb
  .boolQuery()
  .must(esb.matchQuery('schema.keyword', 'Organization'))
  .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));

const DetailStep = () => {
  const [fundsOffset, setFundsOffset] = useState<number>(0);
  const [groupsOffset, setGroupsOffset] = useState<number>(0);
  const [groupsTitle, setGroupsTitle] = useState<string>('');
  const [publishersOffset, setPublishersOffset] = useState<number>(0);

  const { roles } = useUserInfo();
  let roleFunds: string[] | undefined;
  if (!roles.SystemAdmin) {
    roleFunds = [...(roles.FundFinancialManager || []), ...(roles.FundManager || [])];
  }

  const [publishersElasticQuery, setPublishersElasticQuery] = useState<esb.BoolQuery>(
    publisherInitQuery,
  );
  const [{ data: publishers }] = useGetPublishersNameQuery({
    pause: isEmpty(publishersElasticQuery),
    variables: {
      limit,
      offset: publishersOffset,
      query: publishersElasticQuery,
    },
  });

  const [formData, setFormData] = useAtom(formDataAtom);
  let journalGroupsParams: any = {
    title: groupsTitle,
  };
  if (formData.publisher) {
    journalGroupsParams = {
      ...journalGroupsParams,
      publisherId: formData.publisher?.id,
    };
  }
  const journalGroups = useGetJournalGroups(journalGroupsParams);
  const [fundersEQ, setFundsElasticQuery] = useState<esb.BoolQuery>(
    fundInitQuery(roleFunds),
  );
  const [funders] = useGetFundersQuery({
    pause: isEmpty(fundersEQ),
    variables: {
      limit,
      offset: fundsOffset,
      query: fundersEQ,
    },
  });

  const onPublisherFilterTermChanged = (newTerm: string) => {
    let query;
    if (newTerm) {
      query = esb
        .boolQuery()
        .must(esb.multiMatchQuery(['title^2', 'title.suggestion'], newTerm))
        .filter(esb.termQuery('schema.keyword', 'Organization'))
        .filter(esb.termQuery('Organization.type.keyword', 'Publisher'));
    }
    setPublishersElasticQuery(query ?? publisherInitQuery);
  };

  const onFundFilterTermChanged = (newTerm: string) => {
    let query;
    if (newTerm) {
      query = fundQueryByTerm(newTerm, roleFunds);
    }
    setFundsElasticQuery(query ?? fundInitQuery);
  };

  return (
    <Container>
      <FormControl>
        <FormLabel>Policy</FormLabel>
        <PolicyContainer>
          <SquareButton
            label="Voucher"
            isSelected={formData.type === 'VOUCHER'}
            handleClick={() =>
              setFormData((a) => {
                a.type = 'VOUCHER';
              })
            }
            icon={<TicketSVG />}
          />
          <SquareButton
            label="Invoice"
            isSelected={formData.type === 'INVOICE'}
            handleClick={() =>
              setFormData((a) => {
                a.type = 'INVOICE';
              })
            }
            icon={<CreditCardSVG />}
          />
        </PolicyContainer>
      </FormControl>
      {formData.type === 'VOUCHER' && (
        <FormControl>
          <FormLabel>Publisher</FormLabel>
          <Autocomplete
            placeHolder="Select Publisher"
            items={itemsMapper(publishers?.search.items)}
            searchPlaceholder="Type to filter Publisher"
            onFilterChange={onPublisherFilterTermChanged}
            selectedItems={formData.publisher ? [formData.publisher] : []}
            onLoadMoreItems={() => setPublishersOffset(publishersOffset + limit)}
            onSelect={(index) =>
              setFormData((a) => {
                a.publisher = index as Item;
              })
            }
          />
        </FormControl>
      )}
      <FormColumn>
        <FormControl>
          <FormLabel>Groups</FormLabel>
          <Autocomplete
            placeHolder="Select groups"
            searchPlaceholder="Type to filter Journal Groups"
            onFilterChange={(newTerm: string) => {
              setGroupsTitle(newTerm);
            }}
            multiSelectable
            selectedItems={formData.journals}
            items={itemsMapper(journalGroups.data)}
            onLoadMoreItems={() => setGroupsOffset(groupsOffset + limit)}
            onSelect={(item) =>
              setFormData((data) => {
                const foundJournals = data.journals.find(
                  (journal) => journal.id === item.id,
                );
                if (!foundJournals) {
                  data.journals.push(item);
                } else {
                  remove(data.journals, foundJournals);
                }
              })
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Funder</FormLabel>
          <Autocomplete
            placeHolder="Select Funder"
            searchPlaceholder="Type to filter Funder"
            onFilterChange={onFundFilterTermChanged}
            items={itemsMapper(funders.data?.search.items)}
            selectedItems={formData.funder ? [formData.funder] : []}
            onLoadMoreItems={() => setFundsOffset(fundsOffset + limit)}
            onSelect={(index) =>
              setFormData((a) => {
                a.funder = index as Item;
              })
            }
          />
        </FormControl>
      </FormColumn>
      <FormControl>
        <FormLabel>Title</FormLabel>
        <Input
          onChange={(val) =>
            setFormData((a) => {
              a.title = val;
            })
          }
          value={formData.title}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Terms</FormLabel>
        <StyledTextarea
          onChange={(e) =>
            setFormData((a) => {
              a.terms = e.target.value;
            })
          }
          value={formData.terms}
          rowsMin={4}
          fullWidth
          placeholder="Specify your terms and conditions for the policy for this list"
        />
      </FormControl>
    </Container>
  );
};

export default DetailStep;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  padding: 92px 0 36px 0;

  textarea {
    background-color: ${({ theme }) => theme.palette.grey['200']};
    border: ${({ theme }) => theme.palette.grey['200']};
  }
`;

const PolicyContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const FormColumn = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;

const StyledTextarea = styled(Textarea)`
  &:focus {
    box-shadow: 0 0 0 3px rgba(192, 239, 239, 0.4);
  }
`;
