declare namespace jest {
  interface Matchers<R> {
    toBeDeepEqual(expected: any): R;
  }
  interface Expect {
    toBeDeepEqual(expected: any): any;
  }
}
