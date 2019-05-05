import { Movie, MovieDetailed } from '../movie/interface';
import { ObjectMap } from './object-map';

export interface State {
  movies: ObjectMap<Movie | MovieDetailed>;
  user: User;
}

interface User {
  displayName: string;
}
