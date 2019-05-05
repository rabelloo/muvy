import { CaseSetup } from './case-setup';
import { createSlice } from './createSlice';
import { Store } from './store';
import { Subscription } from './subscription';
import { MetaReducer, Reducer, Subscriber } from './types';

/**
 * Creates a new `Store` for state that can be subscribed for changes
 * and updated immutably by registering reducers
 * and calling their respective dispatch functions.
 * @param initialData Data to initialize the store with.
 * @param metaReducers Optionally provide meta reducers,
 * which run on every dispatch but have no effect on state.
 * `logger()` available.
 * @example
 * createStore({ count: 0, name: '' }, logger())
 */
export function createStore<State extends {}>(
  initialData: State,
  metaReducers: ReadonlyArray<MetaReducer<State, any>>
): Store<State> {
  let state: State;
  const types = new Set<string>();
  const subscribers = new Set<Subscriber<State>>();

  set({ ...initialData }, '[Core] initialize store');

  return {
    case: caseType,
    slice: (property: keyof State) =>
      createSlice({
        getState: () => state,
        property: property as any,
        register,
        setProp,
        subscribe,
      }),
    state: () => state,
    subscribe,
  };

  function caseType(type: string): CaseSetup<State> {
    return {
      reduce: <P>(reducer: Reducer<State, P>) => {
        register(type);

        return (payload?: P) => set(reducer(state, payload), type, payload);
      },
    };
  }

  function register(type: string) {
    if (types.has(type)) {
      throw new Error(`Store already has registration of type (${type}).
Choose a different type and make sure you only call register() once per type.`);
    }

    types.add(type);
  }

  function set<P>(newState: State, type: string, payload?: P) {
    state = Object.freeze(newState);
    metaReducers.forEach(meta => meta(state, { type, payload }));
    subscribers.forEach(subscriber => subscriber(state));
  }

  function setProp<K extends keyof State, P>(
    prop: K,
    propState: State[K],
    type: string,
    payload?: P
  ) {
    set({ ...state, [prop]: Object.freeze(propState) }, type, payload);
  }

  function subscribe(subscriber: Subscriber<State>): Subscription {
    subscribers.add(subscriber);
    subscriber(state);

    return {
      unsubscribe: () => subscribers.delete(subscriber),
    };
  }
}
