import { Action } from './action';
import { MetaReducer } from './types';

export function logger<S, T>(): MetaReducer<S, T> {
  let previousState: S;

  return (state: S, action: Action<T>) => {
    // tslint:disable: no-console
    console.group('Store');
    console.log(`Previous state`, previousState);
    console.log(`Action`, action);
    console.log(`Next state`, state);
    console.groupEnd();
    // tslint:enable: no-console

    previousState = state;
  };
}
