import { Dispatcher, Reducer } from './types';

/**
 * Object with a reduce function that can
 * setup reducers for a `Store` or `StoreSlice`.
 */
export interface CaseSetup<S> {
  /**
   * Finish registration of a reducer for a specific type of action.
   * The result of the reducer function will be the new state,
   * produced when the specified type is dispatched.
   *
   * @returns `Dispatcher` function for specified type of action.
   * @param reducer Reducer to execute when the specified
   * type of action is dispatched.
   * @example
   * const dispatch = store
   * * .case('[Source] action description')
   * * .reduce((state, payload) => state + payload);
   */
  reduce: <P>(reducer: Reducer<S, P>) => Dispatcher<P>;
}
