import { camelCase } from './camel-case';

/**
 * Remaps an object with underscore_case or dash-case property keys
 * to one with camelCase equivalent property keys.
 * @param data Object to remap.
 */
export function camelize<T extends { [key: string]: any }>(data: T): T {
  const mapped = { ...data };

  // reducer is slower
  Object.keys(data).forEach(prop => {
    const camelized = camelCase(prop);
    if (prop !== camelized) {
      mapped[camelized] = mapped[prop];
      delete mapped[prop];
    }
  });

  return mapped;
}
