import { isEmpty } from 'lodash';

export const isAllValuesInObjNotEmpty = (
  obj: Record<string, any>,
  keys: string[],
): boolean => keys.map((key) => !isEmpty(obj[key])).every((e) => e);
