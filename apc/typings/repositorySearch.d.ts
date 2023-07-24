interface BaseQueryType {
  search: {
    items: any[];
  };
}

type GetItemTypeFromQueryType<
  QueryType extends BaseQueryType,
  TypeName extends string
> = Extract<QueryType['search']['items'][number], { __typename?: TypeName }>;
