export default [
  {
    label: 'should return empty for some irrelevant string',
    data: 'abc',
    expectations: [
      {
        subject: 'length',
        toBe: 0,
      },
    ],
  },
  {
    label: 'should return empty when variable name not specified',
    data: '{{form.processVariables}}',
    expectations: [
      {
        subject: 'length',
        toBe: 0,
      },
    ],
  },
  {
    label: 'should return empty when structure not correct(right curly braces)',
    data: '{{form.processVariables.a',
    expectations: [
      {
        subject: 'length',
        toBe: 0,
      },
    ],
  },
  {
    label: 'should return empty when structure not correct(left curly brace)',
    data: '{form.processVariables.a}}',
    expectations: [
      {
        subject: 'length',
        toBe: 0,
      },
    ],
  },
  {
    label: 'should return correct on one simple variable name',
    data: '{{form.processVariables.a}}',
    expectations: [
      {
        subject: 'length',
        toBe: 1,
      },
      {
        subject: '0',
        toBe: 'a',
      },
    ],
  },
  {
    label: 'should return correct on one variable name with unnecessary spaces around',
    data: '{{  form.processVariables.a     }}',
    expectations: [
      {
        subject: 'length',
        toBe: 1,
      },
      {
        subject: '0',
        toBe: 'a',
      },
    ],
  },
  {
    label: 'should return one variable name on repeated variable names',
    data:
      '{{form.processVariables.a.b}}{{form.processVariables.a}}{{form.processVariables.a.c}}',
    expectations: [
      {
        subject: 'length',
        toBe: 1,
      },
      {
        subject: '0',
        toBe: 'a',
      },
    ],
  },
  {
    label:
      'should return variable names on most complex case(object variables, repeated, spaces around)',
    data:
      '{{form.processVariables.a.b  }}abc{{   form.processVariables.a}}  {form.processVariables.d}} {{form.processVariables.b}}  acde {{  form.processVariables.a.c}}',
    expectations: [
      {
        subject: 'length',
        toBe: 2,
      },
      {
        subject: '0',
        toBe: 'a',
      },
      {
        subject: '1',
        toBe: 'b',
      },
    ],
  },
];
