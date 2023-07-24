/* eslint-disable jest/no-conditional-expect */
/* eslint-disable jest/no-if */
import { checkServiceError } from './checkServiceError';

describe('get accessed process variables function', () => {
  it('should return null for undefined string', () => {
    const result = checkServiceError();

    expect(result).toBeNull();
  });

  it('should return null for irrelevant string', () => {
    const result = checkServiceError('abc');

    expect(result).toBeNull();
  });

  it('should return error code and message', () => {
    const result = checkServiceError(
      'java.lang.Exception: SERVICE_ERROR[404]:there is no available voucher for this policy',
    );

    expect(result).toBeDeepEqual({
      code: 404,
      message: 'there is no available voucher for this policy',
    });
  });
});
