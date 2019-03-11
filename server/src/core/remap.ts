/**
 * Transforms an object according to a dictionary.
 * @param pairs Pairs of keys to map. Array or Object.
 * @example
 * let mapper = remap({ from: 'to' });
 * mapper = remap(['from', 'to']);
 * mapper({ from: 1 });
 * // { to: 1 }
 */
export function remap<T, R = T>(pairs: KeyMap<T, R>): (t: T) => R {
  const dict = pairs instanceof Array ? pairs : Object.entries(pairs);

  return data => {
    const mapped: any = { ...data };

    // reducer is slower
    dict.forEach(([from, to]: [any, any]) => {
      if (to instanceof Array) {
        const [prop, map] = to;
        mapped[prop] = map(mapped[from]);
      } else {
        mapped[to] = mapped[from];
      }
      delete mapped[from];
    });

    return mapped;
  };
}

type KeyMap<T, R> = { [K in keyof T]?: To<T, R, K> } | Pair<T, R, keyof T>[];
type Pair<T, R, K extends keyof T> = [K, To<T, R, K>];
type To<T, R, K extends keyof T> = keyof R | [keyof R, (value: T[K]) => any];
