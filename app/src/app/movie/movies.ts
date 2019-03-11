import { html } from 'lit-html';
import { Movie } from './interface';
import { MovieCard } from './movie-card';
import styles from './movies.scss';

export const Movies = (movies: Movie[]) => html`
  <ul class=${styles.ul}>
    ${movies.map(MovieCard)}
  </ul>
`;
