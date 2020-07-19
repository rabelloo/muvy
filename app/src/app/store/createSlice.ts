import { CaseSetup } from './case-setup';
import { StoreSlice } from './store-slice';
import { Subscription } from './subscription';
import { Reducer, Subscriber } from './types';

/**
 * Creates a new `StoreSlice` for more easily managing
 * a part of state, with all the same features of `Store`.
 *
 * It's more of an internal function, better exposed
 * via both `Store`'s and `StoreSlice`'s `.slice()`.
 */
export function createSlice<S, K extends keyof S>({
  getState,
  property,
  register,
  setProp,
  subscribe,
}: {
  getState: () => S;
  property: K;
  register: (type: string) => void;
  setProp: <P>(prop: K, state: S[K], type: string, payload?: P) => void;
  subscribe: (subscriber: Subscriber<S>) => Subscription;
}): StoreSlice<S[K]> {
  const subs = (subscriber: Subscriber<S[K]>): Subscription =>
    subscribe((state) => subscriber(state[property]));

  return {
    case: (type: string): CaseSetup<S[K]> => ({
      reduce: <P>(reducer: Reducer<S[K], P>) => {
        register(type);

        return (payload?: P) =>
          setProp(
            property,
            reducer(getState()[property], payload),
            type,
            payload
          );
      },
    }),
    slice: <X extends keyof S[K]>(prop: X) =>
      createSlice({
        getState: () => getState()[property],
        property: prop,
        register,
        setProp: (p: X, propState: S[K][X], type, payload) => {
          setProp(
            property,
            {
              ...getState()[property],
              [p]: Object.freeze(propState),
            },
            type,
            payload
          );
        },
        subscribe: (subscriber: Subscriber<any>): Subscription =>
          subs((state) => subscriber(state[prop])),
      }),
    subscribe: subs,
  };
}
