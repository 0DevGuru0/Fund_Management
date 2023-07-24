import simpleSum from './simpleSum';

describe('Dummy test (unit)', () => {
  it('should add two numbers', () => {
    expect(simpleSum(1, 2)).toBe(3);
  });

  it('should work with our custom matcher', () => {
    const date = new Date();
    expect({ date }).toBeDeepEqual({ date: date.toISOString() });
  });
});
