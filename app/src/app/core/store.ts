import { createStore, logger } from '../store';
import { State } from './state';

const initialData: State = {
  movies: {},
  user: { displayName: '' },
};

const metaReducers = process.env.NODE_ENV === 'production' ? [] : [logger()];

export const store = createStore<State>(initialData, metaReducers);
