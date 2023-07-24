### TODOs
| Filename | line # | TODO
|:------|:------:|:------
| [src/worker/index.ts](src/worker/index.ts#L11) | 11 | static jwt now works because of validation=disabled in the camunda
| [src/application/components/StoryFC.ts](src/application/components/StoryFC.ts#L1) | 1 | change my location to another folder
| [src/service/api/combineHandlers.ts](src/service/api/combineHandlers.ts#L6) | 6 | JSONSchemaType<any> does not extend JSONSchemaType<T> so I had to set the type as any (which is not safe!)
| [src/service/api/combineHandlers.ts](src/service/api/combineHandlers.ts#L14) | 14 | validate methodHandlers, check for duplicate method handlers + check for invalid methods
| [src/service/api/withMiddleware.ts](src/service/api/withMiddleware.ts#L49) | 49 | serialize the response using AJV serializer or Fast JSON Stringify
| [src/service/api/withMiddleware.ts](src/service/api/withMiddleware.ts#L70) | 70 | handle { body: object | undefined } type
| [src/service/api/withMiddleware.ts](src/service/api/withMiddleware.ts#L83) | 83 | extend NextApiRequest with locals field
| [src/service/auth/AuthenticationManager.ts](src/service/auth/AuthenticationManager.ts#L46) | 46 | this is keycloak specific as it does not provide revocation endpoint in discovery
| [src/service/doaj/bulkDelete.ts](src/service/doaj/bulkDelete.ts#L30) | 30 | response may contain several queries, we will need to fetch them using map
| [src/service/doaj/parser.ts](src/service/doaj/parser.ts#L47) | 47 | We should think about strategies for below issues
| [src/service/doaj/parser.ts](src/service/doaj/parser.ts#L73) | 73 | we need to find a way to get currency (in abb format, e.g. USD, EUR) and apcPrice - IW-420
| [src/service/openApi/getOpenApiComponents.ts](src/service/openApi/getOpenApiComponents.ts#L8) | 8 | looks like orval does not support this https://swagger.io/docs/specification/data-models/data-types/#any
| [src/service/openApi/getOpenApiPathsConfig.ts](src/service/openApi/getOpenApiPathsConfig.ts#L42) | 42 | add a full ajv based validation of options here
| [src/service/tasks/queryActiveTasks.ts](src/service/tasks/queryActiveTasks.ts#L35) | 35 | we may need to uncomment this if we have unrelated process defs in a tenant
| [src/service/tasks/queryActiveTasks.ts](src/service/tasks/queryActiveTasks.ts#L49) | 49 | fix this!
| [src/service/tasks/queryTasksHistory.ts](src/service/tasks/queryTasksHistory.ts#L52) | 52 | make this work for history!
| [src/service/validator/ajv.ts](src/service/validator/ajv.ts#L40) | 40 | add this when we added response validation
| [src/service/wfEngine/orvalGotMutator.ts](src/service/wfEngine/orvalGotMutator.ts#L18) | 18 | createDeployment API properties removed due to this bug: https://github.com/anymaniax/orval/issues/168
| [src/application/lib/auth/store.ts](src/application/lib/auth/store.ts#L8) | 8 | We have to find a way to unify these two approaches into a single one
| [src/pages/api/v1/tasks.ts](src/pages/api/v1/tasks.ts#L73) | 73 | this search should be process agnostic (ArticleTitle is process specific)
| [src/service/data/graphql/graphQLClient.ts](src/service/data/graphql/graphQLClient.ts#L7) | 7 | IW-452
| [src/service/doaj/types/Currency.ts](src/service/doaj/types/Currency.ts#L1) | 1 | the list should be completed overtime
| [src/service/doaj/types/Journal.ts](src/service/doaj/types/Journal.ts#L10) | 10 | Subjects to have the type "Subjects Tree"
| [src/service/groups/api/getUserGroupsApi.ts](src/service/groups/api/getUserGroupsApi.ts#L11) | 11 | Admin Only API
| [src/application/components/pages/JournalGroupDetails/journalsOfJournalGroupApiToJournalTableItem.ts](src/application/components/pages/JournalGroupDetails/journalsOfJournalGroupApiToJournalTableItem.ts#L29) | 29 | Assuming that we have abbreviated names (e.g. USD), we need to use currencySymbol to appear the symbols of each currency
| [src/application/components/pages/JournalGroupDetails/journalsOfJournalGroupApiToJournalTableItem.ts](src/application/components/pages/JournalGroupDetails/journalsOfJournalGroupApiToJournalTableItem.ts#L48) | 48 | Currently, we have no information about the state of journal
| [src/application/components/templates/JournalsTable/filterQueryBuilder.ts](src/application/components/templates/JournalsTable/filterQueryBuilder.ts#L33) | 33 | Currently, we do not have states Active/Suspended
| [src/application/components/templates/JournalsTable/filterQueryBuilder.ts](src/application/components/templates/JournalsTable/filterQueryBuilder.ts#L59) | 59 | we do not have any APC and Currency in database - It will be handled in IW-420
| [src/application/components/templates/JournalsTable/filterQueryBuilder.ts](src/application/components/templates/JournalsTable/filterQueryBuilder.ts#L60) | 60 | we should check the MAX APC filter's functionality after IW-420
| [src/application/components/templates/JournalsTable/filterQueryBuilder.ts](src/application/components/templates/JournalsTable/filterQueryBuilder.ts#L92) | 92 | We need to wait for Repository to change ignore_above command in keyword search
| [src/application/components/templates/JournalsTable/journalApiToJournalTableItem.ts](src/application/components/templates/JournalsTable/journalApiToJournalTableItem.ts#L31) | 31 | Assuming that we have abbreviated names (e.g. USD), we need to use currencySymbol to appear the symbols of each currency
| [src/application/components/templates/JournalsTable/journalApiToJournalTableItem.ts](src/application/components/templates/JournalsTable/journalApiToJournalTableItem.ts#L58) | 58 | Currently, we have no information about the state of journal
| [src/application/components/templates/Policies/policyApiToPolicyTableItem.ts](src/application/components/templates/Policies/policyApiToPolicyTableItem.ts#L25) | 25 | fix API doc generator types
| [src/pages/api/v1/upload/file.ts](src/pages/api/v1/upload/file.ts#L12) | 12 | orgId should be the current user organizationId that client trigger api from it.
| [src/application/components/pages/Journals/JournalsGroup/journalGroupsApiToCards.ts](src/application/components/pages/Journals/JournalsGroup/journalGroupsApiToCards.ts#L13) | 13 | temporary values should be provided by the getJournalGroups API
| [src/application/components/pages/ManagementMessageTemplates/MessageTemplatesTable/config.ts](src/application/components/pages/ManagementMessageTemplates/MessageTemplatesTable/config.ts#L12) | 12 | A new config to cover Selector Filter should be designed after implementing it in IW-583
| [src/application/components/pages/Journals/JournalsGroup/JournalGroupsFilter/utils.ts](src/application/components/pages/Journals/JournalsGroup/JournalGroupsFilter/utils.ts#L13) | 13 | Sort and Filter should be handled by Elasticsearch after providing proper API variables
| [orval.config.js](orval.config.js#L16) | 16 | you should uncomment and regenarate this if the Workflow Service API changes
