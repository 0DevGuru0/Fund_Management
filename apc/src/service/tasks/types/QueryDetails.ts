import {
  TaskQueryDtoSortingItemSortBy,
  VariableQueryParameterDto,
} from '$service/generated/wfCamunda';

export interface QueryDetails {
  variables?: VariableQueryParameterDto[] | undefined;
  processDefinitionId?: string;
  processInstanceIds?: string[];
  username?: string;
  pageNumber: number;
  involvedUser?: string;
  assignee?: string;
  start?: string;
  end?: string;
  sortBy?: TaskQueryDtoSortingItemSortBy;
}
