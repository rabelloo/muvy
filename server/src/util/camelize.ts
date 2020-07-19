import { camelCase } from './camel-case';

/**
 * Remaps an object with underscore_case or dash-case property keys
 * to one with camelCase equivalent property keys.
 * @param data Object to remap.
 */
export function camelize<T>(data: T): T {
  if (!(data instanceof Object)) return data;
  if (data instanceof Array) return data.map(camelize) as any;

  const mapped = {} as T;

  // reducer is slower
  Object.entries(data).forEach(([key, value]) => {
    const camelCaseKey = camelCase(key) as keyof T;
    mapped[camelCaseKey] = camelize(value);
  });

  return mapped;
}
