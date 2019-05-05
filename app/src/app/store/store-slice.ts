import { Store } from './store';

/**
 * A slice of `Store` that can be reduced and subscribed to more simply,
 * since state used is limited to a part of the root state.
 */
export interface StoreSlice<T> extends Store<T> {}
