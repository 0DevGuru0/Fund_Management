type TKeys = string | number | symbol;
export const omit = <T extends Record<TKeys, any>, K extends keyof T>(
  originalObject: T,
  keys: K | K[],
): Omit<T, K> => {
  const newObject: any = {};
  const _keys: K[] = Array.isArray(keys) ? keys : [keys];

  for (const key in originalObject) {
    if (_keys.indexOf(key as any) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(originalObject, key)) continue;
    newObject[key] = originalObject[key];
  }
  return newObject as Omit<T, K>;
};
