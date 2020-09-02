import { Movie, MovieDetailed } from '../movie/interface';

export interface State {
  movies: Record<string, Movie | MovieDetailed>;
  user: User;
}

interface User {
  displayName: string;
}
