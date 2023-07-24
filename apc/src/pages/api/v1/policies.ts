import { combineHandlers } from '$api/combineHandlers';
import createPolicyApi from '$service/policies/api/createPolicyApi';
import getPoliciesApi from '$service/policies/api/getPoliciesApi';

export default combineHandlers(createPolicyApi, getPoliciesApi);
