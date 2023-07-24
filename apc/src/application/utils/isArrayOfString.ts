export const isArrayOfString = <T>(arg: string[] | T[]): arg is string[] =>
  typeof arg[0] === 'string';
