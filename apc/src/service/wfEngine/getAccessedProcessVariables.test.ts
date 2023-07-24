import { getAccessedProcessVariables } from '$service/wfEngine/getAccessedProcessVariables';

import testCases from './getAccessedProcessVariables.data';

describe('get accessed process variables function', () => {
  for (const testCase of testCases) {
    it(testCase.label, () => {
      const accessedProcessVariableNames = getAccessedProcessVariables(testCase.data);

      for (const expectation of testCase.expectations) {
        expect(accessedProcessVariableNames[expectation.subject]).toBe(expectation.toBe);
      }
    });
  }
});
