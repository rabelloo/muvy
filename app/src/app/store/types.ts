import { Action } from './action';

/**
 * Function that dispatches a new action
 * for reducers to update state in the store.
 *
 * Optionally provides the action's payload.
 */
export type Dispatcher<P> = (payload?: P) => void;
/**
 * Function that takes in the current state
 * and the payload of an action,
 * but does not affect neither current nor new state.
 */
export type MetaReducer<S, P> = (state: S, action: Action<P>) => void;
/**
 * Function that takes in the current state
 * and the payload of an action to produce new state.
 */
export type Reducer<S, P> = (state: S, payload?: P) => S;
/**
 * Function that takes in state and returns a slice of it.
 */
export type Slicer<S, R extends S[keyof S]> = (state: S) => R;
/**
 * Function that will execute with new state every time it changes.
 */
export type Subscriber<S> = (state: S) => void;
