import { camelCase } from './camel-case';

/**
 * Remaps an object with underscore_case or dash-case property keys
 * to one with camelCase equivalent property keys.
 * @param data Object to remap.
 */
export function camelize<T extends { [key: string]: any }>(data: T): T {
  const mapped = {} as T;

  // reducer is slower
  Object.entries(data).forEach(([prop, value]) => {
    const camelized = camelCase(prop);
    mapped[camelized] =
      value instanceof Array
        ? value.map(maybeCamelize)
        : maybeCamelize(value);
  });

  return mapped;
}

const isObject = (value: any): value is object =>
  value && value.constructor === {}.constructor;
const maybeCamelize = (v: any) => (isObject(v) ? camelize(v) : v);
