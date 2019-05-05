/**
 * A plain JavaScript object that is similar to a native Map, but always has strings as keys.
 */
export interface ObjectMap<T> {
  [key: string]: T;
}

type KeyFn<T> = (item: T, index: number) => string | number;

export function toObjectMap<T>(array: T[], keyFn: KeyFn<T>): ObjectMap<T> {
  return array.reduce(
    (objectMap, item, index) => {
      const key = `${keyFn(item, index)}`;

      // Faster than spreading, safe here
      objectMap[key] = item;
      return objectMap;
    },
    {} as ObjectMap<T>
  );
}
