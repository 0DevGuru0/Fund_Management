/* eslint-disable */
import {mapValues, isPlainObject} from 'lodash';

const mapValuesDeep = (iteree) => (object) =>
  isPlainObject(object)
    ? mapValues(object, (value) => mapValuesDeep(iteree)(value))
    : Array.isArray(object)
    ? object.map((element) => mapValuesDeep(iteree)(element))
    : iteree(object);

const mapSpecialObjectsToString = mapValuesDeep((value) => {
  if (value instanceof Date) {
    return value.toISOString();
  }
  return value;
});

expect.extend({
  toBeDeepEqual(received, expected) {
    const cleanReceived = mapSpecialObjectsToString(received);
    const cleanExpected = mapSpecialObjectsToString(expected);
    const pass = this.equals(cleanReceived, cleanExpected);
    const matcherName = 'toBeDeepEqual';

    const message = pass
      ? () =>
          this.utils.matcherHint(matcherName, undefined, undefined) +
          '\n\n' +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          `Received: ${this.utils.printReceived(received)}`
      : () => {
          const difference = this.utils.diff(cleanExpected, cleanReceived, {
            expand: this.expand,
          });
          return (
            this.utils.matcherHint(matcherName, undefined, undefined) +
            '\n\n' +
            (difference && difference.includes('- Expect')
              ? `Difference:\n\n${difference}`
              : `Expected: ${this.utils.printExpected(expected)}\n` +
                `Received: ${this.utils.printReceived(received)}`)
          );
        };

    return {
      actual: received,
      name: matcherName,
      expected,
      message,
      pass,
    };
  },
});
