import { CaseSetup } from './case-setup';
import { StoreSlice } from './store-slice';
import { Subscription } from './subscription';
import { Subscriber } from './types';

/**
 * Container of state that can only be mutated via action dispatches
 * and notifies subcribers of any changes.
 */
export interface Store<State> {
  /**
   * Start setting up a reducer by its action type,
   * continue with `.reduce()` for full registration.
   * @param type Action type to trigger the reducer.
   * @example
   * store
   * .case('[Source] action description')
   * .reduce((state, payload) => state + payload);
   */
  case: (type: string) => CaseSetup<State>;
  /**
   * Slices a part of state by its property, returning
   * a more manageable `StoreSlice` with all the same features.
   */
  slice: <K extends keyof State>(property: K) => StoreSlice<State[K]>;
  /**
   * Gets the current state of the Store.
   */
  state: () => State;
  /**
   * Subscribe to `Store` changes.
   *
   * Subscriber function will execute on every change.
   */
  subscribe: (subscriber: Subscriber<State>) => Subscription;
}
